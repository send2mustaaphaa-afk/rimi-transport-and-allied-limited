import React, { useState, useEffect } from 'react';
import { COMPANY_DETAILS, TrackingShipment } from '../data/companyData';
import {
  getQuoteRequests,
  QuoteRequestRecord,
  getContactMessages,
  ContactMessageRecord,
  fetchRemoteQuotes,
  fetchRemoteContactMessages,
  updateRemoteQuote,
  syncShipmentToSupabase
} from '../data/adminStore';
import {
  checkSupabaseHealth,
  SupabaseHealth,
  SQL_SCHEMA_SETUP,
  SUPABASE_URL
} from '../data/supabaseClient';
import {
  LayoutDashboard,
  Boxes,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  ArrowRight,
  TrendingUp,
  Search,
  MessageSquare,
  ShieldCheck,
  Truck,
  Ship,
  FileCheck,
  Lock,
  User,
  LogOut,
  ArrowLeft,
  X,
  Phone,
  Building,
  Check,
  Eye,
  EyeOff,
  Database,
  RefreshCw,
  Copy,
  ExternalLink,
  Server,
  Mail,
  AlertCircle
} from 'lucide-react';

// --- CONFIG ---
const ADMIN_USERS = ["Usman Aliyu Haidar", "rimi_admin", "admin"];
const ADMIN_PASS = "Rimi@2026";
const SESSION_KEY = "rimi_admin_session";

interface AdminPageProps {
  onReturnHome: () => void;
  shipments: TrackingShipment[];
  onUpdateShipment: (updated: TrackingShipment) => void;
  onAddShipment: (newShipment: TrackingShipment) => void;
}

interface QuoteLead {
  id: string;
  clientName: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  containerType: string;
  origin: string;
  destination: string;
  date: string;
  status: 'New' | 'PAAR Assessing' | 'Quoted' | 'Approved' | 'Dispatched';
  estimatedCost?: string;
}

const INITIAL_QUOTE_LEADS: QuoteLead[] = [
  {
    id: "RTL-QT-901842",
    clientName: "Alhaji Bello Gambo",
    company: "North-West Commodities Ltd",
    phone: "+234 803 219 4001",
    email: "bello.gambo@nwcommodities.ng",
    service: "Customs Clearance & Haulage",
    containerType: "40ft High Cube (HQ)",
    origin: "Tianjin Port, China",
    destination: "Kano Inland Container Depot",
    date: "Today, 10:15 AM",
    status: "New",
    estimatedCost: "₦4,850,000"
  },
  {
    id: "RTL-QT-847219",
    clientName: "Dr. Chioma Nnadi",
    company: "PharmaPrime Diagnostics",
    phone: "+234 812 400 9981",
    email: "c.nnadi@pharmaprime.com",
    service: "Air Freight & Fast Customs Clearance",
    containerType: "Air Cargo Package (Temp Controlled)",
    origin: "Munich, Germany",
    destination: "Victoria Island, Lagos",
    date: "Yesterday, 04:30 PM",
    status: "Quoted",
    estimatedCost: "₦1,920,000"
  },
  {
    id: "RTL-QT-739102",
    clientName: "Engr. Babatunde Sanusi",
    company: "Lagos InfraBuild Contractors",
    phone: "+234 909 332 1104",
    email: "b.sanusi@infrabuild.ng",
    service: "Sea Freight & Heavy Haulage",
    containerType: "Breakbulk / Project Cargo",
    origin: "Antwerp, Belgium",
    destination: "Lekki Free Zone, Lagos",
    date: "05 Oct, 11:20 AM",
    status: "PAAR Assessing",
    estimatedCost: "₦12,400,000"
  }
];

export const AdminPage: React.FC<AdminPageProps> = ({
  onReturnHome,
  shipments,
  onUpdateShipment,
  onAddShipment
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'consignments' | 'quotes' | 'messages' | 'tariff' | 'backend'>('overview');
  const [quoteLeads, setQuoteLeads] = useState<QuoteLead[]>(INITIAL_QUOTE_LEADS);
  const [contactMessages, setContactMessages] = useState<ContactMessageRecord[]>([]);
  const [supabaseHealth, setSupabaseHealth] = useState<SupabaseHealth | null>(null);
  const [isTestingBackend, setIsTestingBackend] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isSeedingSupabase, setIsSeedingSupabase] = useState(false);
  const [seedNotice, setSeedNotice] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Consignment Form State
  const [newConsignment, setNewConsignment] = useState({
    trackingId: `RTL-APP-${Math.floor(1000 + Math.random() * 9000)}`,
    consignee: '',
    origin: '',
    destination: 'Apapa Port Terminal, Lagos',
    serviceType: 'Sea Freight FCL & Customs Clearance',
    status: 'In Transit' as TrackingShipment['status'],
    eta: 'In 3 Days',
    containerNumber: 'MSCU-',
    vesselOrFlight: 'MSC VESSEL / VOY 2026'
  });

  const testBackendConnection = async () => {
    setIsTestingBackend(true);
    try {
      const health = await checkSupabaseHealth();
      setSupabaseHealth(health);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTestingBackend(false);
    }
  };

  useEffect(() => {
    // Check sessionStorage, NOT localStorage
    try {
      const session = sessionStorage.getItem(SESSION_KEY);
      if (session === "authenticated") {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error(e);
    }
    setChecked(true);

    // Initial Supabase health test
    testBackendConnection();

    // Sync stored quotes from Supabase & local
    const loadStoredQuotes = async () => {
      // 1. Fetch remote quotes if available
      const remote = await fetchRemoteQuotes();
      if (remote.length > 0) {
        const mappedStored: QuoteLead[] = remote.map((q: QuoteRequestRecord) => ({
          id: q.id,
          clientName: q.fullName || 'Prospective Shipper',
          company: q.companyName || 'Private Shipper',
          phone: q.phone,
          email: q.email,
          service: q.shipmentType,
          containerType: q.containerSize || q.cargoDescription || 'Standard Cargo',
          origin: q.origin || 'International Origin Port',
          destination: q.destination || 'Apapa Port, Lagos',
          date: q.createdAt ? new Date(q.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recently',
          status: q.status || 'New',
          estimatedCost: q.estimatedCost
        }));

        setQuoteLeads(prev => {
          const existingIds = new Set(mappedStored.map(m => m.id));
          const remainingInitials = prev.filter(p => !existingIds.has(p.id));
          return [...mappedStored, ...remainingInitials];
        });
      }

      // 2. Fetch contact messages
      const msgs = await fetchRemoteContactMessages();
      setContactMessages(msgs);
    };

    loadStoredQuotes();
    const handleQuoteAdded = () => loadStoredQuotes();
    const handleMsgAdded = () => loadStoredQuotes();
    window.addEventListener('rimi_quote_added', handleQuoteAdded);
    window.addEventListener('rimi_message_added', handleMsgAdded);
    return () => {
      window.removeEventListener('rimi_quote_added', handleQuoteAdded);
      window.removeEventListener('rimi_message_added', handleMsgAdded);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isUserValid = ADMIN_USERS.some(u => u.toLowerCase() === username.trim().toLowerCase());
    const isPassValid = password === ADMIN_PASS;

    if (isUserValid && isPassValid) {
      try {
        sessionStorage.setItem(SESSION_KEY, "authenticated");
      } catch (err) {
        console.error(err);
      }
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password");
      setIsLoggedIn(false); // CRITICAL: Do NOT show dashboard on wrong password
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (err) {
      console.error(err);
    }
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleAdvanceStage = (shipment: TrackingShipment) => {
    const currentIndex = shipment.milestones.findIndex(m => m.current);
    if (currentIndex >= 0 && currentIndex < shipment.milestones.length - 1) {
      const updatedMilestones = shipment.milestones.map((m, idx) => {
        if (idx === currentIndex) {
          return { ...m, completed: true, current: false };
        }
        if (idx === currentIndex + 1) {
          return { ...m, completed: false, current: true, timestamp: 'Updated Just Now by Admin' };
        }
        return m;
      });

      let newStatus: TrackingShipment['status'] = shipment.status;
      const nextStageName = updatedMilestones[currentIndex + 1]?.stage.toLowerCase() || '';
      if (nextStageName.includes('customs') || nextStageName.includes('examination')) {
        newStatus = 'Customs Examination';
      } else if (nextStageName.includes('terminal') || nextStageName.includes('gate out')) {
        newStatus = 'Terminal Cleared';
      } else if (nextStageName.includes('delivered') || nextStageName.includes('delivery')) {
        newStatus = 'Delivered';
      }

      const updatedShipment: TrackingShipment = {
        ...shipment,
        status: newStatus,
        milestones: updatedMilestones
      };

      onUpdateShipment(updatedShipment);
    }
  };

  const handleCreateConsignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConsignment.consignee || !newConsignment.trackingId) return;

    const created: TrackingShipment = {
      trackingId: newConsignment.trackingId.trim().toUpperCase(),
      consignee: newConsignment.consignee,
      origin: newConsignment.origin || 'International Origin Port',
      destination: newConsignment.destination,
      serviceType: newConsignment.serviceType,
      status: newConsignment.status,
      eta: newConsignment.eta,
      containerNumber: newConsignment.containerNumber,
      vesselOrFlight: newConsignment.vesselOrFlight,
      milestones: [
        { stage: "Form M & PAAR Assessment", location: "CBN Trade Portal / NCS Command", timestamp: "Initiated Today", completed: true, current: false, notes: "Verified by RIMI Apapa Clearance Desk" },
        { stage: "Terminal Berthing & Discharge", location: "Apapa / Tin Can Port Quay", timestamp: "Scheduled on Arrival", completed: false, current: true, notes: "Awaiting container discharge to terminal yard" },
        { stage: "Physical Customs Examination", location: "Apapa Customs Enforcement Zone", timestamp: "Pending Discharge", completed: false, current: false },
        { stage: "Terminal Release & Gate-Out", location: "Main Port Gate", timestamp: "Pending Duty Verification", completed: false, current: false },
        { stage: "Final Inland Delivery to Consignee", location: newConsignment.destination, timestamp: "Pending Gate-Out", completed: false, current: false }
      ]
    };

    onAddShipment(created);
    setIsAddingNew(false);
    setNewConsignment({
      trackingId: `RTL-APP-${Math.floor(1000 + Math.random() * 9000)}`,
      consignee: '',
      origin: '',
      destination: 'Apapa Port Terminal, Lagos',
      serviceType: 'Sea Freight FCL & Customs Clearance',
      status: 'In Transit',
      eta: 'In 3 Days',
      containerNumber: 'MSCU-',
      vesselOrFlight: 'MSC VESSEL / VOY 2026'
    });
    setActiveTab('consignments');
  };

  const handleUpdateQuoteStatus = (leadId: string, newStatus: QuoteLead['status']) => {
    setQuoteLeads(prev => prev.map(q => q.id === leadId ? { ...q, status: newStatus } : q));
    updateRemoteQuote(leadId, { status: newStatus });
  };

  const handleSeedShipments = async () => {
    setIsSeedingSupabase(true);
    setSeedNotice(null);
    try {
      for (const s of shipments) {
        await syncShipmentToSupabase(s);
      }
      setSeedNotice(`Synced ${shipments.length} consignments to Supabase 'shipments' table!`);
      await testBackendConnection();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setSeedNotice(`Sync notice: ${msg}`);
    } finally {
      setIsSeedingSupabase(false);
    }
  };

  const filteredShipments = shipments.filter(s => {
    const matchesSearch = s.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.consignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.containerNumber && s.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!checked) return null; // avoid flicker

  // --- 1. SECURE LOGIN SCREEN (WHEN NOT LOGGED IN) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.12),transparent_50%)]" />

        <div className="relative z-10 w-full max-w-md">
          {/* Top Brand Lockup */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-2xl font-display mx-auto mb-3 shadow-lg shadow-amber-500/20">
              R
            </div>
            <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">
              {COMPANY_DETAILS.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authorized Logistics Operations & Clearing Console
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 sm:p-8 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <Lock className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Staff Login</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Usman Aliyu Haidar"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-xl transition-colors cursor-pointer shadow-md shadow-amber-500/20"
              >
                Sign In to Console
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800 text-center">
              <button
                onClick={onReturnHome}
                className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-slate-600">
            Apapa Maritime Hub · 11A Pelewura Way, Apapa Lagos
          </div>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED ADMIN DASHBOARD ---
  const totalShipments = shipments.length;
  const inExaminationCount = shipments.filter(s => s.status === 'Customs Examination' || s.status === 'In Transit').length;
  const clearedCount = shipments.filter(s => s.status === 'Terminal Cleared' || s.status === 'Delivered').length;
  const newQuotesCount = quoteLeads.filter(q => q.status === 'New').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Admin Top Header */}
      <header className="bg-slate-950 text-white px-4 sm:px-8 py-4 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md ring-2 ring-amber-400/40 shrink-0">
              <LayoutDashboard className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold font-display text-white tracking-tight">
                  Logistics Operations Console
                </h1>
                <span className="text-[10px] font-extrabold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Apapa HQ
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {COMPANY_DETAILS.name} · Terminal Dispatch & PAAR Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Backend:</span>
              <span className="flex items-center gap-1 font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Supabase Live</span>
              </span>
            </div>
            <button
              onClick={onReturnHome}
              className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>New Consignment</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation Tabs */}
      <div className="bg-slate-900 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              <span>Overview & Stats</span>
            </button>

            <button
              onClick={() => setActiveTab('consignments')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'consignments'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Boxes className="w-4 h-4 stroke-[2.5]" />
              <span>Active Consignments ({shipments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'quotes'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 stroke-[2.5]" />
              <span>Quote Inquiries ({quoteLeads.length})</span>
              {newQuotesCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-slate-900 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mail className="w-4 h-4 stroke-[2.5]" />
              <span>Contact Inquiries ({contactMessages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tariff')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'tariff'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Customs & Port Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('backend')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'backend'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Database className="w-4 h-4 stroke-[2.5]" />
              <span>Supabase Backend</span>
              <span className={`w-2 h-2 rounded-full ${supabaseHealth?.connected ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`}></span>
            </button>
          </div>

          <div className="text-xs text-slate-300 hidden lg:flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 animate-pulse"></span>
            <span className="font-semibold text-white">Apapa Terminal Operations: Active</span>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-6">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Active Consignments</span>
                  <div className="text-3xl font-black font-mono text-slate-900 mt-1 tabular-nums">
                    {totalShipments}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5 mt-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span>Real-time milestone tracking</span>
                  </span>
                </div>
                <div className="w-13 h-13 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md ring-2 ring-slate-800 shrink-0">
                  <Boxes className="w-7 h-7 stroke-[2.2]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Customs Examination</span>
                  <div className="text-3xl font-black font-mono text-amber-600 mt-1 tabular-nums">
                    {inExaminationCount}
                  </div>
                  <span className="text-[11px] text-amber-800 font-bold flex items-center gap-1.5 mt-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 stroke-[2.5]" />
                    <span>Apapa & Tin Can Yards</span>
                  </span>
                </div>
                <div className="w-13 h-13 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md ring-2 ring-amber-400/50 shrink-0">
                  <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Gate-Out & Cleared</span>
                  <div className="text-3xl font-black font-mono text-emerald-600 mt-1 tabular-nums">
                    {clearedCount}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5 mt-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span>Zero demurrage fees</span>
                  </span>
                </div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md ring-2 ring-emerald-500/40 shrink-0">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Incoming Quotes</span>
                  <div className="text-3xl font-black font-mono text-indigo-700 mt-1 tabular-nums">
                    {quoteLeads.length}
                  </div>
                  <span className="text-[11px] text-indigo-700 font-bold flex items-center gap-1.5 mt-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600 shrink-0 stroke-[2.5]" />
                    <span>{newQuotesCount} new inquiries</span>
                  </span>
                </div>
                <div className="w-13 h-13 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md ring-2 ring-indigo-500/40 shrink-0">
                  <FileSpreadsheet className="w-7 h-7 stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* Supabase Live Cloud Backend Sync Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-display">
                      Supabase Cloud Database Connected
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Project: <code className="text-amber-400 font-mono">brclfzknbsveotjzwzyi.supabase.co</code> · All quotes, contact inquiries, and shipments sync automatically with local fallback.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => setActiveTab('backend')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
                >
                  <Server className="w-3.5 h-3.5 text-amber-400" />
                  <span>Backend Console</span>
                </button>
              </div>
            </div>

            {/* Quick Actions & Live Port Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Quick Manager Actions */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                      <Boxes className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      Immediate Consignment Operations
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Add Consignment</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {shipments.slice(0, 3).map((shipment) => {
                    const activeMilestone = shipment.milestones.find(m => m.current) || shipment.milestones[0];
                    return (
                      <div key={shipment.trackingId} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                            <Ship className="w-5 h-5 stroke-[2]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                                {shipment.trackingId}
                              </span>
                              <span className="text-xs font-bold text-slate-900">
                                {shipment.consignee}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-xs border border-amber-200">
                                {activeMilestone?.stage}
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>{activeMilestone?.location}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAdvanceStage(shipment)}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto whitespace-nowrap cursor-pointer shadow-2xs"
                          title="Advance milestone stage"
                        >
                          <span>Advance Stage</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Apapa Maritime Terminal Daily Log */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Ship className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      Apapa Port Live Feed
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Pelewura Desk
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">PAAR Assessment Complete</span>
                      <span className="text-[11px] text-slate-600 leading-normal">Form M #FM-2026-990 validated on NCS portal</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Ship className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Vessel Berthing at APMT Apapa</span>
                      <span className="text-[11px] text-slate-600 leading-normal">CMA CGM vessel docked at Berth 14; discharge active</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-2xs">
                      <Clock className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Physical Examination Appointment</span>
                      <span className="text-[11px] text-slate-600 leading-normal">Joint NCS & NAFDAC inspection at Enforcement Gate 3</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-indigo-50/70 border border-indigo-200">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Truck className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Haulage Convoy Dispatched</span>
                      <span className="text-[11px] text-slate-600 leading-normal">3x 40ft container flatbeds en route via expressway</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. CONSIGNMENTS & TRACKING MANAGER TAB */}
        {activeTab === 'consignments' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 stroke-[2.5]" />
                <input
                  type="text"
                  placeholder="Search by ID, consignee, container..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500 focus:bg-white text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs text-slate-600 font-bold shrink-0">Filter:</span>
                {['All', 'In Transit', 'Customs Examination', 'Terminal Cleared', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      statusFilter === st
                        ? 'bg-slate-900 text-amber-400 shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>New Consignment</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Tracking Ref</th>
                      <th className="py-3.5 px-4">Consignee & Service</th>
                      <th className="py-3.5 px-4">Container / Vessel</th>
                      <th className="py-3.5 px-4">Origin → Destination</th>
                      <th className="py-3.5 px-4">Current Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredShipments.map((shipment) => {
                      const activeMilestone = shipment.milestones.find(m => m.current) || shipment.milestones[0];
                      return (
                        <tr key={shipment.trackingId} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                            <span className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
                              {shipment.trackingId}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-slate-900 block text-xs">{shipment.consignee}</span>
                            <span className="text-[11px] text-slate-500">{shipment.serviceType}</span>
                          </td>
                          <td className="py-4 px-4 text-slate-700">
                            <span className="font-mono text-amber-700 font-semibold block">{shipment.containerNumber || 'N/A'}</span>
                            <span className="text-[11px] text-slate-500">{shipment.vesselOrFlight}</span>
                          </td>
                          <td className="py-4 px-4 text-slate-600">
                            <span className="block font-semibold text-slate-800">{shipment.origin}</span>
                            <span className="text-[11px] text-slate-500">→ {shipment.destination}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              {shipment.status}
                            </span>
                            <span className="block text-[10px] text-slate-500 mt-0.5 truncate max-w-xs">
                              {activeMilestone?.stage}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleAdvanceStage(shipment)}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ml-auto shadow-2xs"
                              title="Advance milestone"
                            >
                              <span>Advance Stage</span>
                              <ArrowRight className="w-3 h-3 text-amber-400 stroke-[2.5]" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. QUOTES & LEADS DESK TAB */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FileSpreadsheet className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Incoming Inquiries & Cargo Quotations
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculate duty estimates and send direct WhatsApp tariff quotes to clients.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">
                {quoteLeads.length} Total Leads
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quoteLeads.map((lead) => (
                <div key={lead.id} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3.5 shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-sm">
                      {lead.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      lead.status === 'New' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      lead.status === 'Quoted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {lead.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{lead.clientName}</h4>
                    <span className="text-xs text-slate-600 block">{lead.company}</span>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Phone className="w-3 h-3 text-amber-500" />
                        {lead.phone}
                      </span>
                      <span>·</span>
                      <span className="truncate">{lead.email}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 text-slate-700 border border-slate-150">
                    <div><strong>Service:</strong> {lead.service}</div>
                    <div><strong>Container:</strong> {lead.containerType}</div>
                    <div><strong>Route:</strong> {lead.origin} → {lead.destination}</div>
                    {lead.estimatedCost && (
                      <div className="pt-1.5 text-amber-700 font-bold border-t border-slate-200 flex items-center justify-between">
                        <span>Estimated Cost:</span>
                        <span className="font-mono text-sm">{lead.estimatedCost}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                    <a
                      href={COMPANY_DETAILS.whatsappMessageUrl(
                        `Hello ${lead.clientName}, this is RIMI TRANSPORT AND ALLIED LIMITED regarding your quote request (${lead.id}) for ${lead.service}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>WhatsApp Client</span>
                    </a>

                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateQuoteStatus(lead.id, e.target.value as QuoteLead['status'])}
                      className="text-xs bg-slate-100 border border-slate-200 rounded-md px-2 py-1 font-semibold text-slate-700 focus:outline-hidden"
                    >
                      <option value="New">New</option>
                      <option value="PAAR Assessing">PAAR Assessing</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Approved">Approved</option>
                      <option value="Dispatched">Dispatched</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TARIFF & PORT DIRECTORY TAB */}
        {activeTab === 'tariff' && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                  <FileCheck className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Nigeria Customs Service (NCS) Tariff & Clearing Directory
                  </h3>
                  <p className="text-xs text-slate-600">
                    Standard clearing workflows, statutory documents, and terminal demurrage mitigation guidelines for RIMI clearance officers.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Essential Import Documentation Checklist
                  </h4>
                </div>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>Form M:</strong> Open via Trade Portal (CBN validated)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>PAAR:</strong> Pre-Arrival Assessment Report issued by NCS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>Bill of Lading / Air Waybill:</strong> Original endorsed copies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>Commercial Invoice & Packing List:</strong> Itemized HS codes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>SONCAP / NAFDAC:</strong> Conformity certification (if regulated)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>CCVO:</strong> Combined Certificate of Value and Origin</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Ship className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Key Apapa Maritime Terminal Contacts
                  </h4>
                </div>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>APM Terminals Apapa:</strong> Berth 1-18 (Direct access from Pelewura Way)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>TICT (Tin Can Island):</strong> Terminal B & C</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>PTML Terminal:</strong> Ro-Ro vehicles & container handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>SAHCO / NAHCO:</strong> Murtala Muhammed Airport Cargo sheds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><strong>Nigeria Customs Apapa Command:</strong> Command Area HQ, Apapa</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 5. CONTACT MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Public Contact Inquiries ({contactMessages.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct inquiries submitted via the Contact form on the public website. Synced with Supabase.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const msgs = await fetchRemoteContactMessages();
                    setContactMessages(msgs);
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {contactMessages.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">No Contact Messages Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When potential clients submit messages through the Contact Us section on the homepage, they will appear here in real-time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactMessages.map((msg, idx) => (
                  <div
                    key={msg.id || idx}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3.5"
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{msg.name}</h4>
                        <span className="text-[11px] font-semibold text-amber-600 block">
                          {msg.subject || 'Logistics Inquiry'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                      <div className="flex items-center gap-3 text-slate-600 text-[11px]">
                        <a href={`mailto:${msg.email}`} className="hover:text-amber-600 font-medium flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{msg.email}</span>
                        </a>
                        <span>·</span>
                        <a href={`tel:${msg.phone}`} className="hover:text-amber-600 font-medium flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{msg.phone}</span>
                        </a>
                      </div>

                      <a
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${msg.name}, thank you for contacting RIMI Transport and Allied Limited regarding: ${msg.subject}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                        <span>Reply on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. SUPABASE BACKEND CONSOLE TAB */}
        {activeTab === 'backend' && (
          <div className="space-y-6">
            {/* Header info card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Database className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-white font-display">
                        Supabase Backend Configuration & Status
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Live Connected
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Cloud REST Database Endpoint: <code className="text-amber-400 font-mono">{SUPABASE_URL}</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={testBackendConnection}
                    disabled={isTestingBackend}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingBackend ? 'animate-spin text-amber-400' : ''}`} />
                    <span>{isTestingBackend ? 'Testing...' : 'Test Connection'}</span>
                  </button>
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Supabase Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Status details row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">API Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-bold text-white">
                      {supabaseHealth?.connected ? 'REST API Responding (200 OK)' : 'Online (Default Key Active)'}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">Target Project ID</span>
                  <div className="font-mono font-bold text-amber-400 mt-1">
                    brclfzknbsveotjzwzyi
                  </div>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">Storage Mode</span>
                  <div className="font-bold text-white mt-1">
                    Hybrid: Cloud Realtime + Local Fallback
                  </div>
                </div>
              </div>
            </div>

            {/* Table Health & Data Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Quotes table */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Table: public.quotes</h4>
                      <span className="text-[10px] text-slate-500">Commercial quote inquiries</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${supabaseHealth?.tables.quotes ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {supabaseHealth?.tables.quotes ? 'Table Active' : 'Ready to Sync'}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-900">
                  {quoteLeads.length} <span className="text-xs font-normal text-slate-500">leads loaded</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Quotes created by visitors on the homepage are automatically pushed to this table.
                </p>
              </div>

              {/* Contact Messages table */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Table: public.contact_messages</h4>
                      <span className="text-[10px] text-slate-500">Contact form submissions</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${supabaseHealth?.tables.contact_messages ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {supabaseHealth?.tables.contact_messages ? 'Table Active' : 'Ready to Sync'}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-900">
                  {contactMessages.length} <span className="text-xs font-normal text-slate-500">messages</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  General inquiries sent via the Contact section are saved directly to this table.
                </p>
              </div>

              {/* Shipments table */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Boxes className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Table: public.shipments</h4>
                      <span className="text-[10px] text-slate-500">Cargo milestones & tracking</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${supabaseHealth?.tables.shipments ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {supabaseHealth?.tables.shipments ? 'Table Active' : 'Ready to Sync'}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-900">
                  {shipments.length} <span className="text-xs font-normal text-slate-500">consignments</span>
                </div>
                <div className="pt-1">
                  <button
                    onClick={handleSeedShipments}
                    disabled={isSeedingSupabase}
                    className="w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSeedingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isSeedingSupabase ? 'Syncing...' : 'Sync Consignments to Supabase'}</span>
                  </button>
                  {seedNotice && (
                    <p className="text-[10px] text-emerald-600 font-medium mt-1 text-center">
                      {seedNotice}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SQL Setup Helper */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span>Supabase SQL Schema Script</span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      PostgreSQL DDL + RLS
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    To initialize the tables or allow public read/write access, run this script in your Supabase SQL Editor:
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(SQL_SCHEMA_SETUP);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 2500);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    copiedSql
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-80 leading-relaxed border border-slate-800 select-all">
                  {SQL_SCHEMA_SETUP}
                </pre>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Add Consignment Sub-Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Register New Consignment
                </h4>
              </div>
              <button
                onClick={() => setIsAddingNew(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            <form onSubmit={handleCreateConsignment} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Tracking Number / Reference</label>
                <input
                  type="text"
                  required
                  value={newConsignment.trackingId}
                  onChange={(e) => setNewConsignment({ ...newConsignment, trackingId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono font-bold focus:bg-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Consignee / Merchant Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Industrial Ltd"
                  value={newConsignment.consignee}
                  onChange={(e) => setNewConsignment({ ...newConsignment, consignee: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Container / AWB Number</label>
                  <input
                    type="text"
                    placeholder="MSCU-123456-7"
                    value={newConsignment.containerNumber}
                    onChange={(e) => setNewConsignment({ ...newConsignment, containerNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono focus:bg-white focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Vessel / Flight</label>
                  <input
                    type="text"
                    placeholder="MSC LAURA"
                    value={newConsignment.vesselOrFlight}
                    onChange={(e) => setNewConsignment({ ...newConsignment, vesselOrFlight: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Origin Port</label>
                  <input
                    type="text"
                    placeholder="Shanghai Port"
                    value={newConsignment.origin}
                    onChange={(e) => setNewConsignment({ ...newConsignment, origin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Destination in Nigeria</label>
                  <input
                    type="text"
                    value={newConsignment.destination}
                    onChange={(e) => setNewConsignment({ ...newConsignment, destination: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:bg-white focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  Save & Publish Consignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
