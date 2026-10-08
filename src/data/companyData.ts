export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  turnaroundTime: string;
  suitableFor: string;
  deliverables: string[];
}

export interface TrackingMilestone {
  stage: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  notes?: string;
}

export interface TrackingShipment {
  trackingId: string;
  consignee: string;
  origin: string;
  destination: string;
  serviceType: string;
  status: 'In Transit' | 'Customs Examination' | 'Terminal Cleared' | 'Delivered' | 'Documentation';
  eta: string;
  containerNumber?: string;
  vesselOrFlight?: string;
  milestones: TrackingMilestone[];
}

export const COMPANY_DETAILS = {
  name: "RIMI TRANSPORT AND ALLIED LIMITED",
  shortName: "RIMI Transport & Allied",
  tagline: "Reliable Clearing & Forwarding Solutions for Your Business",
  subHeadline: "We provide efficient customs clearance, freight forwarding, transportation, and logistics solutions to move your cargo safely and on time.",
  phone: "+234(0) 9127232001",
  phoneRaw: "+2349127232001",
  email: "rimitransportandalliedlimited@gmail.com",
  officeAddress: "11A PELEWURA WAY, APAPA LAGOS STATE.",
  businessHours: "MONDAY - FRIDAY (8:00 AM - 6:00 PM)",
  whatsappNumber: "08169183582",
  whatsappUrl: "https://wa.me/2348169183582",
  whatsappMessageUrl: (msg: string) => `https://wa.me/2348169183582?text=${encodeURIComponent(msg)}`,
  locationCoordinates: {
    lat: 6.4468,
    lng: 3.3639,
    description: "11A Pelewura Way, Apapa, Lagos (Direct corridor to Lagos Ports Complex & Tin Can Island)"
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "customs-clearance",
    title: "Customs Clearance",
    shortDescription: "Fast-track import/export customs clearance across all Nigerian ports, ensuring strict adherence to tariff codes and customs regulations.",
    fullDescription: "Our seasoned customs brokerage team expedites cargo declaration, duty assessment, Pre-Arrival Assessment Report (PAAR) processing, physical customs examination, and fast clearance release at Apapa Port, Tin Can Island, PTML, and airports without unnecessary delays.",
    iconName: "ShieldCheck",
    features: [
      "PAAR (Pre-Arrival Assessment Report) fast processing",
      "HS Code tariff classification & duty optimization",
      "Physical customs examination representation",
      "Direct interface with Nigeria Customs Service (NCS)",
      "NAFDAC, SONCAP, and regulatory agency permits"
    ],
    turnaroundTime: "24 - 72 Hours upon vessel discharge",
    suitableFor: "Importers, manufacturers, FMCG distributors, raw materials traders",
    deliverables: ["Customs Release Order", "Duty Receipt Confirmation", "Exit Gate Passes"]
  },
  {
    id: "freight-forwarding",
    title: "Freight Forwarding",
    shortDescription: "End-to-end global freight coordination connecting Nigerian sea and air hubs to major international trade routes worldwide.",
    fullDescription: "Seamless logistics connectivity for sea, air, and multimodal cargo shipments. We negotiate competitive container freight rates, consolidate shipments, manage international carrier contracts, and oversee routing from origin manufacturing plants directly to destination warehouses.",
    iconName: "Globe",
    features: [
      "FCL (Full Container Load) & LCL (Less Container Load) consolidation",
      "Global carrier negotiations and competitive slot rates",
      "Door-to-door and Port-to-Door logistics coordination",
      "Multimodal freight solutions tailored to timelines",
      "Real-time shipment status milestone tracking"
    ],
    turnaroundTime: "Scheduled sailing / flight routes",
    suitableFor: "Commercial importers, multinationals, industrial equipment buyers",
    deliverables: ["Master & House Bill of Lading", "Pre-Alert Notifications", "Cargo Status Reports"]
  },
  {
    id: "import-export-services",
    title: "Import & Export Services",
    shortDescription: "Comprehensive advisory and handling for seamless inward imports and outward non-oil export shipments from Nigeria.",
    fullDescription: "Complete support for Nigerian cross-border commerce. From Form M opening, Letters of Credit (LC) compliance, Central Bank of Nigeria (CBN) trade guidelines to NXP export documentation and export terminal processing for agricultural and industrial commodities.",
    iconName: "ArrowLeftRight",
    features: [
      "Form M processing & CBN Trade Portal compliance",
      "Export NXP documentation and NEPC guidelines",
      "Commercial invoice and packing list audits",
      "Temporary import permits and bond clearances",
      "Advisory on Nigerian trade treaties (AfCFTA, ECOWAS ETLS)"
    ],
    turnaroundTime: "Same-day document validation",
    suitableFor: "Exporters of solid minerals/agro-produce, international trade merchants",
    deliverables: ["Validated Form M", "NXP Completion", "Certificate of Origin"]
  },
  {
    id: "sea-freight",
    title: "Sea Freight",
    shortDescription: "High-capacity ocean container shipping and bulk vessel management via major shipping lines with dependable transit schedules.",
    fullDescription: "Specialized maritime solutions managing 20ft, 40ft, 40ft HQ dry containers, refrigerated reefers, flat racks, and breakbulk maritime shipments. Proximity to Apapa and Tin Can ports gives our clients unrivaled berthing oversight and rapid container de-stuffing.",
    iconName: "Ship",
    features: [
      "Dry van 20ft/40ft & High Cube container forwarding",
      "Refrigerated (Reefer) containers with cold-chain monitoring",
      "Project cargo, heavy machinery & Out-of-Gauge (OOG) shipping",
      "Shipping line demurrage risk reduction protocols",
      "Direct coordination with Maersk, MSC, CMA CGM, Grimaldi, COSCO"
    ],
    turnaroundTime: "Ocean transit + expedited port discharge",
    suitableFor: "Heavy machinery, bulk goods, automotive vehicles, general merchandise",
    deliverables: ["Ocean Bill of Lading", "Container Seals Verification", "Port Gate Clearance"]
  },
  {
    id: "air-freight",
    title: "Air Freight",
    shortDescription: "Urgent, time-critical air cargo forwarding and rapid clearance at Murtala Muhammed Airport cargo terminals.",
    fullDescription: "When speed is paramount, our air freight division manages expedited cargo handling, high-value freight security, temperature-controlled transit, and same-day/next-day customs clearance at MMIA Ikeja Lagos and Abuja Cargo Terminals.",
    iconName: "Plane",
    features: [
      "Express air cargo for urgent spare parts and pharmaceuticals",
      "Airport cargo terminal clearance (SAHCO & NAHCO sheds)",
      "High-value, sensitive, and hazardous goods protocol (IATA)",
      "Air Waybill (AWB) preparation and cargo handover",
      "Consolidated air freight for cost efficiency"
    ],
    turnaroundTime: "24 - 48 Hours from touchdown to delivery",
    suitableFor: "Pharmaceuticals, electronic components, critical spare parts, fashion",
    deliverables: ["Air Waybill (AWB)", "SAHCO/NAHCO Tally Sheet", "Customs Air Release"]
  },
  {
    id: "land-transportation",
    title: "Land Transportation",
    shortDescription: "Heavy-duty truck haulage and inter-state cargo distribution across Lagos, the South-West, and nationwide Nigerian corridors.",
    fullDescription: "Reliable modern fleet of flatbed trailers, enclosed box trucks, low-bed heavy haulers, and container chassis. We guarantee secure inland transit from Apapa Port gates to industrial zones, factory gates, and inland depots across Nigeria.",
    iconName: "Truck",
    features: [
      "Heavy-duty flatbed articulated trailers for 20ft/40ft containers",
      "Low-bed trailers for oversized transformers & heavy construction gear",
      "GPS-monitored fleet with transit escort security options",
      "Direct transit from Apapa port to client factory premises",
      "Comprehensive Goods-in-Transit (GIT) insurance coverage"
    ],
    turnaroundTime: "Same-day dispatch upon port release",
    suitableFor: "Factories, distribution hubs, construction projects across Nigeria",
    deliverables: ["Waybill Receipt", "Driver Manifest", "Signed Delivery Confirmation"]
  },
  {
    id: "cargo-handling",
    title: "Cargo Handling",
    shortDescription: "Safe, precision loading, offloading, heavy rigging, and lashing for fragile and oversized freight.",
    fullDescription: "Professional handling at terminal quays, off-dock container yards, and private industrial sites. Our certified teams deploy cranes, forklifts, and marine-grade securing equipment to eliminate cargo damage during transshipment.",
    iconName: "Boxes",
    features: [
      "Crane rigging and heavy machinery positioning",
      "Professional container de-stuffing & cargo palletization",
      "Industrial lashing, choking & maritime seaworthy securing",
      "Damage-prevention quality inspection reports",
      "Special handling for fragile, glass, and industrial valves"
    ],
    turnaroundTime: "On-demand terminal & yard operations",
    suitableFor: "Industrial plants, project cargo, high-density machinery",
    deliverables: ["Tally & Inspection Report", "Lashing Certificate", "Photographic Log"]
  },
  {
    id: "warehousing-storage",
    title: "Warehousing & Storage",
    shortDescription: "Secure, monitored transit storage and off-dock holding facilities strategically situated in the Lagos port corridor.",
    fullDescription: "Flexible short-term and long-term storage facilities with round-the-clock physical and electronic security. Ideal for holding cargo pending distribution, inventory consolidation, bonded warehousing, and cross-docking operations.",
    iconName: "Warehouse",
    features: [
      "24/7 CCTV surveillance and secured perimeter protection",
      "Bonded and non-bonded warehouse options near port corridors",
      "Inventory cataloging, batch tracking, and pallet racking",
      "Cross-docking and immediate de-consolidation hubs",
      "Fire suppression, pest control, and weatherized roofs"
    ],
    turnaroundTime: "Flexible daily/monthly leasing tiers",
    suitableFor: "Distributors needing buffer inventory, seasonal retailers, manufacturers",
    deliverables: ["Warehouse Inward Receipt (WIR)", "Stock Status Reports", "Pick & Pack Manifest"]
  },
  {
    id: "documentation-compliance",
    title: "Documentation & Compliance",
    shortDescription: "Complete statutory trade compliance, tariff audits, regulatory permits, and customs paperwork audits.",
    fullDescription: "Eliminate costly regulatory penalties and demurrage through meticulous document review. We assist with Soncap certificates, NAFDAC registrations, Clean Report of Inspection, commercial valuation defense, and customs dispute resolution.",
    iconName: "FileCheck",
    features: [
      "SONCAP, NAFDAC, NESREA, and DPR permit clearance",
      "Customs valuation objection and dispute resolutions",
      "Trade document pre-scrutiny before vessel arrival",
      "HS Code classification advisory to ensure correct duty assessment",
      "Audit trail records archiving for corporate tax and statutory checks"
    ],
    turnaroundTime: "Rapid audit within 1 business day",
    suitableFor: "Corporate procurement teams, compliance officers, international shippers",
    deliverables: ["Compliance Audit Certificate", "Verified Documentation Pack", "Permit Endorsements"]
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: "Experienced Logistics Specialists",
    description: "Our licensed clearing agents and supply chain managers bring decades of hands-on experience navigating Nigerian port protocols and international trade corridors.",
    stat: "100%",
    statLabel: "Licensed & Compliant",
    icon: "Award"
  },
  {
    title: "Fast-Track Processing & Release",
    description: "Strategically located at 11A Pelewura Way, Apapa, minutes from Apapa and Tin Can Island ports, enabling rapid terminal assessments and fast cargo exit.",
    stat: "48-72h",
    statLabel: "Average Release Window",
    icon: "Zap"
  },
  {
    title: "Competitive & Transparent Pricing",
    description: "No hidden surcharges or surprise terminal fees. We deliver clear, line-item quotations and proactive strategies to prevent demurrage and storage penalties.",
    stat: "0",
    statLabel: "Hidden Fees Policy",
    icon: "TrendingDown"
  },
  {
    title: "Reliable & Safe Cargo Delivery",
    description: "From quay apron to your warehouse door, all freight is handled with rigorous security measures, GPS-tracked haulage, and insured transit protocols.",
    stat: "99.8%",
    statLabel: "Safe Arrival Rate",
    icon: "ShieldAlert"
  },
  {
    title: "Dedicated Client Support",
    description: "Direct access to your dedicated logistics officer via phone, email, and WhatsApp. Proactive updates at every customs inspection milestone.",
    stat: "24/7",
    statLabel: "Dedicated Inquiries",
    icon: "Headphones"
  }
];

export const DEMO_TRACKING_SHIPMENTS: TrackingShipment[] = [
  {
    trackingId: "RTL-APP-8921",
    consignee: "Industrial Polymers Nig Ltd",
    origin: "Shanghai Port (China)",
    destination: "Ikeja Industrial Estate, Lagos",
    serviceType: "Sea Freight FCL & Customs Clearance",
    status: "Customs Examination",
    eta: "Tomorrow, 2:00 PM",
    containerNumber: "MSCU-849201-9",
    vesselOrFlight: "MSC LAURA - Voyage 240B",
    milestones: [
      { stage: "Booking & Form M Validation", location: "CBN Trade Portal / Origin", timestamp: "18 Sep, 09:30 AM", completed: true, current: false, notes: "Form M validated and PAAR issued" },
      { stage: "Ocean Vessel Departure", location: "Shanghai Port, China", timestamp: "22 Sep, 04:15 PM", completed: true, current: false, notes: "Bill of Lading MSCL09281 issued" },
      { stage: "Berthing & Discharge at Apapa Terminal", location: "Apapa Port Terminal, Lagos", timestamp: "04 Oct, 08:20 AM", completed: true, current: false, notes: "Container discharged to terminal yard" },
      { stage: "Physical Customs Examination & Assessment", location: "Apapa Customs Enforcement Zone", timestamp: "06 Oct, 11:00 AM", completed: false, current: true, notes: "Joint physical inspection underway with Customs officers" },
      { stage: "Terminal Release & Gate Out", location: "Apapa Main Port Gate", timestamp: "Estimated 07 Oct", completed: false, current: false },
      { stage: "Final Truck Delivery to Consignee", location: "Ikeja Industrial Estate", timestamp: "Estimated 07 Oct, 04:00 PM", completed: false, current: false }
    ]
  },
  {
    trackingId: "RTL-AIR-1093",
    consignee: "MediCare Diagnostics Ltd",
    origin: "Frankfurt (FRA), Germany",
    destination: "Victoria Island, Lagos",
    serviceType: "Air Cargo & Fast Customs Clearance",
    status: "Terminal Cleared",
    eta: "Today, 5:00 PM",
    containerNumber: "AWB #020-94817203",
    vesselOrFlight: "Lufthansa Cargo LH8220",
    milestones: [
      { stage: "Cargo Acceptance & Export Clearance", location: "Frankfurt Airport (FRA)", timestamp: "03 Oct, 02:00 PM", completed: true, current: false },
      { stage: "Touchdown & SAHCO Cargo Shed Tally", location: "MMIA Cargo Terminal, Ikeja Lagos", timestamp: "05 Oct, 06:45 AM", completed: true, current: false },
      { stage: "NAFDAC & Customs Fast-Track Release", location: "MMIA Customs Command", timestamp: "06 Oct, 10:15 AM", completed: true, current: false },
      { stage: "Dispatched via Express Haulage", location: "En route to Victoria Island", timestamp: "06 Oct, 01:30 PM", completed: false, current: true, notes: "Driver in transit along Third Mainland Bridge corridor" },
      { stage: "Delivered to Warehouse", location: "Victoria Island Lagos", timestamp: "Estimated 06 Oct, 05:00 PM", completed: false, current: false }
    ]
  },
  {
    trackingId: "RTL-TIN-4402",
    consignee: "Apex Machinery & Engineering Co.",
    origin: "Antwerp Port, Belgium",
    destination: "Shagamu Interchange Industrial Hub",
    serviceType: "Sea Freight & Heavy Haulage",
    status: "Delivered",
    eta: "Completed",
    containerNumber: "CMAU-918204-1",
    vesselOrFlight: "CMA CGM RIO - Voyage 104A",
    milestones: [
      { stage: "Vessel Discharge", location: "Tin Can Island Port, Lagos", timestamp: "28 Sep, 10:00 AM", completed: true, current: false },
      { stage: "Customs Duty Assessment & Clean Release", location: "Tin Can Command", timestamp: "01 Oct, 02:30 PM", completed: true, current: false },
      { stage: "Heavy Duty Flatbed Loading", location: "Tin Can Off-Dock Terminal", timestamp: "02 Oct, 09:00 AM", completed: true, current: false },
      { stage: "Delivered & Signed at Shagamu Yard", location: "Shagamu Interchange Hub", timestamp: "03 Oct, 03:45 PM", completed: true, current: false, notes: "Delivered safe with zero damage" }
    ]
  }
];

export const PORT_CORRIDORS = [
  {
    name: "Lagos Port Complex (Apapa)",
    distance: "1.2 km from Office",
    description: "Direct proximity to APM Terminals, ENL Consortium, and Greenview Development terminals.",
    capabilities: "Containerized, Breakbulk, Liquid Bulk"
  },
  {
    name: "Tin Can Island Port",
    distance: "3.5 km via Liverpool Road",
    description: "Seamless clearance for TICT, Ports & Cargo Handling, and PTML Ro-Ro vehicle terminals.",
    capabilities: "Ro-Ro Vehicles, FCL, Out-of-Gauge"
  },
  {
    name: "Murtala Muhammed Cargo Airport",
    distance: "22 km via Apapa-Oshodi Expressway",
    description: "Dedicated air cargo clearing agents at SAHCO and NAHCO bonded terminals.",
    capabilities: "Express Freight, Cold-Chain, Urgent Parcels"
  },
  {
    name: "Lekki Deep Sea Port",
    distance: "Direct Highway Transit",
    description: "Modern automated deep sea terminal access for mega container carriers.",
    capabilities: "Ultra Large Container Vessels"
  }
];
