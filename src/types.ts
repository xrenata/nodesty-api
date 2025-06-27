// Base API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// API Configuration
export interface ApiConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

// ============================================================================
// VPS Types
// ============================================================================

// VPS Service Info
export interface VpsInfo {
  vpsId: number;
  proxmoxId: number;
  hostname: string;
  osReinstallLimit: number;
  status: boolean;
  vnc: {
    enabled: boolean;
    ip: string;
    port: string;
    password: string;
  };
  os: {
    name: string;
    distro: string;
  };
  disk: {
    limit: number;      // bytes
    used: number;       // bytes
    free: number;       // bytes
    percent: number;    // percentage
  };
  ips: string[];
  cpu: {
    manu: string;       // manufacturer
    limit: number;      // MHz
    used: number;       // MHz
    free: number;       // MHz
    percent: number;    // percentage
    cores: number;
  };
  ram: {
    limit: number;      // bytes
    used: number;       // bytes
    free: number;       // bytes
    percent: number;    // percentage
  };
  inode: {
    limit: number;
    used: number;
    free: number;
    percent: number;    // percentage
  };
  netspeed: {
    in: number;         // Mbps
    out: number;        // Mbps
  };
  bandwidth: {
    total: {
      usage: number;    // bytes
      in: number;       // bytes
      out: number;      // bytes
    };
    usage: number[];    // Array of usage values
    in: number[];       // Array of incoming bandwidth values
    out: number[];      // Array of outgoing bandwidth values
    categories: string[]; // Array of timestamp strings
  };
}

// VPS Action parameters
export interface VpsActionParams {
  action: 'start' | 'stop' | 'restart' | 'poweroff';
}

// VPS Change Password parameters
export interface VpsChangePasswordParams {
  username: string;
  password: string;
}

// VPS Reinstall parameters
export interface VpsReinstallParams {
  password: string;
  osId: number;
}

// VPS Backup Info
export interface VpsBackup {
  date: string;
  file: string;
  createdAt: number; // Unix timestamp
}

// VPS Backup Restore parameters
export interface VpsBackupRestoreParams {
  date: string;
  file: string;
}

// VPS OS Template
export interface VpsOsTemplate {
  id: number;
  name: string;
}

// VPS Task
export interface VpsTask {
  action: string;         // Description of the task action
  progress: string;       // Progress as string with percentage (e.g., "50%")
  startedAt: number;      // Unix timestamp when task started
  endedAt: number;        // Unix timestamp when task ended
}

// VPS Graph Data
export interface VpsGraphs {
  avgDownload: number;
  avgUpload: number;
  avgIoRead: number;
  avgIoWrite: number;
  cpuUsage: Record<string, number>;     // Dynamic properties with CPU usage percentages
  inodeUsage: Record<string, number>;   // Dynamic properties with inode counts
  ramUsage: Record<string, number>;     // Dynamic properties with RAM usage in bytes
  diskUsage: Record<string, number>;    // Dynamic properties with disk usage in bytes
  ioSpeed: {
    read: number[];                     // Array of read speeds
    write: number[];                    // Array of write speeds
    categories: number[];               // Array of timestamps (Unix timestamps)
  };
  networkSpeed: {
    download: number[];                 // Array of download speeds
    upload: number[];                   // Array of upload speeds
    categories: number[];               // Array of timestamps (Unix timestamps)
  };
}

// ============================================================================
// User Types
// ============================================================================

// User Profile Info
export interface UserInfo {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Service Info
export interface Service {
  id: string;
  type: 'vps' | 'dedicated' | 'hosting';
  name: string;
  status: 'active' | 'suspended' | 'terminated';
  plan: string;
  location: string;
  createdAt: string;
  expiresAt: string;
  autoRenew: boolean;
}

// Ticket Summary
export interface TicketSummary {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

// Ticket
export interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    id: string;
    sender: 'user' | 'support';
    message: string;
    timestamp: string;
    attachments?: Array<{
      name: string;
      url: string;
      size: number;
    }>;
  }>;
}

// Invoice Summary
export interface InvoiceSummary {
  id: string;
  number: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  amount: number;
  currency: string;
  dueDate: string;
  createdAt: string;
}

// Invoice
export interface Invoice {
  id: string;
  number: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  amount: number;
  currency: string;
  subtotal: number;
  tax: number;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
  items: InvoiceItem[];
}

// Invoice Item
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// User Session
export interface UserSession {
  id: string;
  ip: string;
  userAgent: string;
  createdAt: string;
  lastActivity: string;
  isActive: boolean;
}

// Legacy VPS Graph Data
export interface VpsGraphData {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: {
    incoming: number;
    outgoing: number;
  };
}

// ============================================================================
// Dedicated Server Types
// ============================================================================

export interface DedicatedInfo {
  id: string;
  name: string;
  status: string;
  ip: string;
  os: string;
  cpu: string;
  memory: string;
  disk: string;
  uptime: string;
  location: string;
}

export interface DedicatedCpuInfo {
  model: string;
  cores: number;
  threads: number;
  frequency: string;
  cache: string;
}

export interface DedicatedHardware {
  cpu: DedicatedCpuInfo;
  memory: {
    total: string;
    type: string;
    speed: string;
  };
  storage: {
    drives: Array<{
      model: string;
      size: string;
      type: string;
      interface: string;
    }>;
  };
  network: {
    interfaces: Array<{
      name: string;
      speed: string;
      type: string;
    }>;
  };
}

export interface DedicatedActionParams {
  action: 'setPowerOn' | 'setPowerOff' | 'setPowerReset' | 'start' | 'stop' | 'restart' | 'reset';
}

export interface DedicatedOsTemplate {
  id: string;
  name: string;
  version: string;
  architecture: string;
  category: string;
}

export interface DedicatedReinstallParams {
  osTemplateId: string;
  hostname?: string;
  password?: string;
  sshKeys?: string[];
}

export interface DedicatedReinstallStatus {
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress: number;
  message: string;
  startedAt: string;
  completedAt?: string;
}

export interface DedicatedTask {
  id: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  message: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

// ============================================================================
// Firewall Types
// ============================================================================

export interface FirewallAttackLog {
  id: string;
  ip: string;
  attackType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  blocked: boolean;
  details: {
    sourceIp: string;
    targetPort: number;
    protocol: string;
    packets: number;
    bytes: number;
  };
}

export interface FirewallAttackNotification {
  enabled: boolean;
  email: string;
  webhook?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface FirewallAttackNotificationParams {
  enabled?: boolean;
  email?: string;
  webhook?: string;
  emailNotification?: boolean;
  discordWebhookURL?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface FirewallRdns {
  ip: string;
  hostname: string;
  status: 'active' | 'pending' | 'failed';
  updatedAt: string;
}

export interface FirewallRdnsParams {
  hostname: string;
}

export interface FirewallRule {
  id: string;
  port: number;
  protocol: 'tcp' | 'udp' | 'both';
  action: 'allow' | 'deny';
  description?: string;
  enabled: boolean;
  createdAt: string;
}

export interface FirewallRuleParams {
  port: number;
  appId: number;
}

export interface FirewallStats {
  totalAttacks: number;
  blockedAttacks: number;
  allowedConnections: number;
  topAttackers: Array<{
    ip: string;
    attacks: number;
    country: string;
  }>;
  attacksByType: Array<{
    type: string;
    count: number;
  }>;
  timeRange: {
    start: string;
    end: string;
  };
}
