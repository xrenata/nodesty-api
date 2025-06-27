import { VpsApiClient } from './vps-client';
import { UserApiClient } from './user-client';
import { DedicatedApiClient } from './dedicated-client';
import { FirewallApiClient } from './firewall-client';
import { ApiConfig, ApiResponse, VpsInfo, VpsActionParams, VpsChangePasswordParams, VpsReinstallParams, VpsBackup, VpsOsTemplate, VpsTask, VpsGraphs, UserInfo, Service, TicketSummary, Ticket, InvoiceSummary, Invoice, UserSession, DedicatedInfo, DedicatedHardware, DedicatedActionParams, DedicatedOsTemplate, DedicatedReinstallParams, DedicatedReinstallStatus, DedicatedTask, FirewallAttackLog, FirewallAttackNotification, FirewallAttackNotificationParams, FirewallRdns, FirewallRdnsParams, FirewallRule, FirewallRuleParams, FirewallStats } from './types';

export class NodestyClient {
  private vpsClient: VpsApiClient;
  private userClient: UserApiClient;
  private dedicatedClient: DedicatedApiClient;
  private firewallClient: FirewallApiClient;

  constructor(config: ApiConfig) {
    this.vpsClient = new VpsApiClient(config);
    this.userClient = new UserApiClient(config);
    this.dedicatedClient = new DedicatedApiClient(config);
    this.firewallClient = new FirewallApiClient(config);
  }

  /**
   * Update API key for all internal clients
   */
  updateApiKey(newApiKey: string): void {
    this.vpsClient['httpClient'].updateApiKey(newApiKey);
    this.userClient['httpClient'].updateApiKey(newApiKey);
    this.dedicatedClient['httpClient'].updateApiKey(newApiKey);
    this.firewallClient['httpClient'].updateApiKey(newApiKey);
  }

  /**
   * Health check
   */
  async healthCheck() {
    return this.vpsClient.healthCheck();
  }

  // ============================================================================
  // VPS Operations
  // ============================================================================

  /**
   * Get VPS service information
   * GET /api/services/{id}/vps/info
   */
  async getVpsInfo(serviceId: string): Promise<ApiResponse<VpsInfo>> {
    return this.vpsClient.getVpsInfo(serviceId);
  }

  /**
   * Perform VPS action (start, stop, restart, poweroff)
   */
  async performVpsAction(serviceId: string, params: VpsActionParams): Promise<ApiResponse<any>> {
    return this.vpsClient.performVpsAction(serviceId, params);
  }

  /**
   * Start VPS server
   */
  async startVps(serviceId: string): Promise<ApiResponse<any>> {
    return this.vpsClient.startVps(serviceId);
  }

  /**
   * Stop VPS server
   */
  async stopVps(serviceId: string): Promise<ApiResponse<any>> {
    return this.vpsClient.stopVps(serviceId);
  }

  /**
   * Restart VPS server
   */
  async restartVps(serviceId: string): Promise<ApiResponse<any>> {
    return this.vpsClient.restartVps(serviceId);
  }

  /**
   * Power off VPS server
   */
  async powerOffVps(serviceId: string): Promise<ApiResponse<any>> {
    return this.vpsClient.powerOffVps(serviceId);
  }

  /**
   * Change VPS password
   * POST /api/services/{id}/vps/change-password
   */
  async changeVpsPassword(serviceId: string, params: VpsChangePasswordParams): Promise<ApiResponse<any>> {
    return this.vpsClient.changeVpsPassword(serviceId, params);
  }

  /**
   * Get VPS graphs/monitoring data
   * GET /api/services/{id}/vps/graphs
   */
  async getVpsGraphs(serviceId: string): Promise<ApiResponse<VpsGraphs>> {
    return this.vpsClient.getVpsGraphs(serviceId);
  }

  /**
   * Reinstall VPS with new OS template
   * POST /api/services/{id}/vps/reinstall
   */
  async reinstallVps(serviceId: string, params: VpsReinstallParams): Promise<ApiResponse<any>> {
    return this.vpsClient.reinstallVps(serviceId, params);
  }

  /**
   * Get VPS backups
   * GET /api/services/{id}/vps/backups
   */
  async getVpsBackups(serviceId: string): Promise<ApiResponse<VpsBackup[]>> {
    return this.vpsClient.getVpsBackups(serviceId);
  }

  /**
   * Restore VPS from backup
   * POST /api/services/{id}/vps/backups/{date}/{file}
   */
  async restoreVpsBackup(serviceId: string, date: string, file: string): Promise<ApiResponse<any>> {
    return this.vpsClient.restoreVpsBackup(serviceId, date, file);
  }

  /**
   * Restore VPS from backup using backup object
   */
  async restoreVpsBackupFromObject(serviceId: string, backup: VpsBackup): Promise<ApiResponse<any>> {
    return this.vpsClient.restoreVpsBackupFromObject(serviceId, backup);
  }

  /**
   * Get available OS templates
   * GET /api/services/{id}/vps/os-templates
   */
  async getVpsOsTemplates(serviceId: string): Promise<ApiResponse<VpsOsTemplate[]>> {
    return this.vpsClient.getVpsOsTemplates(serviceId);
  }

  /**
   * Get VPS tasks
   * GET /api/services/{id}/vps/tasks
   */
  async getVpsTasks(serviceId: string): Promise<ApiResponse<VpsTask[]>> {
    return this.vpsClient.getVpsTasks(serviceId);
  }

  // ============================================================================
  // User Operations
  // ============================================================================

  /**
   * Get current user profile information
   * GET /api/users/@me
   */
  async getCurrentUser(): Promise<ApiResponse<UserInfo>> {
    return this.userClient.getCurrentUser();
  }

  /**
   * Get user sessions
   * GET /api/users/@me/sessions
   */
  async getUserSessions(): Promise<ApiResponse<UserSession[]>> {
    return this.userClient.getUserSessions();
  }

  /**
   * Get all user services
   * GET /api/services
   */
  async getServices(): Promise<ApiResponse<Service[]>> {
    return this.userClient.getServices();
  }

  /**
   * Get all user tickets
   * GET /api/tickets
   */
  async getTickets(): Promise<ApiResponse<TicketSummary[]>> {
    return this.userClient.getTickets();
  }

  /**
   * Get specific ticket by ID
   * GET /api/tickets/{id}
   */
  async getTicket(ticketId: string): Promise<ApiResponse<Ticket>> {
    return this.userClient.getTicket(ticketId);
  }

  /**
   * Get all user invoices
   * GET /api/users/@me/invoices
   */
  async getInvoices(): Promise<ApiResponse<InvoiceSummary[]>> {
    return this.userClient.getInvoices();
  }

  /**
   * Get specific invoice by ID
   * GET /api/users/@me/invoices/{id}
   */
  async getInvoice(invoiceId: number): Promise<ApiResponse<Invoice>> {
    return this.userClient.getInvoice(invoiceId);
  }

  // ============================================================================
  // Dedicated Server Operations
  // ============================================================================

  /**
   * Get dedicated server information
   * GET /api/services/{id}/dedicated/info
   */
  async getDedicatedInfo(serviceId: string): Promise<ApiResponse<DedicatedInfo>> {
    return this.dedicatedClient.getDedicatedInfo(serviceId);
  }

  /**
   * Get dedicated server hardware information
   * GET /api/services/{id}/dedicated/hardware
   */
  async getDedicatedHardware(serviceId: string): Promise<ApiResponse<DedicatedHardware[]>> {
    return this.dedicatedClient.getDedicatedHardware(serviceId);
  }

  /**
   * Perform action on dedicated server
   * POST /api/services/{id}/dedicated/action
   */
  async dedicatedAction(serviceId: string, params: DedicatedActionParams): Promise<ApiResponse<any>> {
    return this.dedicatedClient.dedicatedAction(serviceId, params);
  }

  /**
   * Get available OS templates for dedicated server
   * GET /api/services/{id}/dedicated/os-templates
   */
  async getDedicatedOsTemplates(serviceId: string): Promise<ApiResponse<DedicatedOsTemplate[]>> {
    return this.dedicatedClient.getDedicatedOsTemplates(serviceId);
  }

  /**
   * Reinstall dedicated server with new OS
   * POST /api/services/{id}/dedicated/reinstall
   */
  async reinstallDedicated(serviceId: string, params: DedicatedReinstallParams): Promise<ApiResponse<any>> {
    return this.dedicatedClient.reinstallDedicated(serviceId, params);
  }

  /**
   * Get dedicated server reinstall status
   * GET /api/services/{id}/dedicated/reinstall-status
   */
  async getDedicatedReinstallStatus(serviceId: string): Promise<ApiResponse<DedicatedReinstallStatus>> {
    return this.dedicatedClient.getDedicatedReinstallStatus(serviceId);
  }

  /**
   * Get dedicated server tasks
   * GET /api/services/{id}/dedicated/tasks
   */
  async getDedicatedTasks(serviceId: string): Promise<ApiResponse<DedicatedTask[]>> {
    return this.dedicatedClient.getDedicatedTasks(serviceId);
  }

  /**
   * Power on dedicated server
   */
  async startDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.dedicatedClient.startDedicated(serviceId);
  }

  /**
   * Power off dedicated server
   */
  async stopDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.dedicatedClient.stopDedicated(serviceId);
  }

  /**
   * Reset/restart dedicated server
   */
  async restartDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.dedicatedClient.restartDedicated(serviceId);
  }

  /**
   * Reset dedicated server
   */
  async resetDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.dedicatedClient.resetDedicated(serviceId);
  }

  /**
   * Power off dedicated server
   */
  async poweroffDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.dedicatedClient.poweroffDedicated(serviceId);
  }

  // ============================================================================
  // Firewall Operations
  // ============================================================================

  /**
   * Get firewall attack logs for a specific IP
   * GET /api/services/{id}/firewall/{ip}/attack-logs
   */
  async getFirewallAttackLogs(serviceId: string, ip: string): Promise<ApiResponse<FirewallAttackLog[]>> {
    return this.firewallClient.getAttackLogs(serviceId, ip);
  }

  /**
   * Get attack notification settings for a specific IP
   * GET /api/services/{id}/firewall/{ip}/attack-notification
   */
  async getFirewallAttackNotification(serviceId: string, ip: string): Promise<ApiResponse<FirewallAttackNotification>> {
    return this.firewallClient.getAttackNotification(serviceId, ip);
  }

  /**
   * Update attack notification settings for a specific IP
   * PUT /api/services/{id}/firewall/{ip}/attack-notification
   */
  async updateFirewallAttackNotification(serviceId: string, ip: string, params: FirewallAttackNotificationParams): Promise<ApiResponse<any>> {
    return this.firewallClient.updateAttackNotification(serviceId, ip, params);
  }

  /**
   * Get rDNS settings for a specific IP
   * GET /api/services/{id}/firewall/{ip}/rdns
   */
  async getFirewallRdns(serviceId: string, ip: string): Promise<ApiResponse<FirewallRdns>> {
    return this.firewallClient.getRdns(serviceId, ip);
  }

  /**
   * Update rDNS settings for a specific IP
   * PUT /api/services/{id}/firewall/{ip}/rdns
   */
  async updateFirewallRdns(serviceId: string, ip: string, params: FirewallRdnsParams): Promise<ApiResponse<any>> {
    return this.firewallClient.updateRdns(serviceId, ip, params);
  }

  /**
   * Delete rDNS settings for a specific IP
   * DELETE /api/services/{id}/firewall/{ip}/rdns
   */
  async deleteFirewallRdns(serviceId: string, ip: string): Promise<ApiResponse<any>> {
    return this.firewallClient.deleteRdns(serviceId, ip);
  }

  /**
   * Get all firewall rules for a specific IP
   * GET /api/services/{id}/firewall/{ip}/rules
   */
  async getFirewallRules(serviceId: string, ip: string): Promise<ApiResponse<FirewallRule[]>> {
    return this.firewallClient.getRules(serviceId, ip);
  }

  /**
   * Create a new firewall rule for a specific IP
   * POST /api/services/{id}/firewall/{ip}/rules
   * Body: { "port": number, "appId": number }
   */
  async createFirewallRule(serviceId: string, ip: string, params: FirewallRuleParams): Promise<ApiResponse<any>> {
    return this.firewallClient.createRule(serviceId, ip, params);
  }

  /**
   * Delete a firewall rule by ID or sequence number
   * DELETE /api/services/{id}/firewall/{ip}/rules/{ruleIdOrSequence}
   */
  async deleteFirewallRule(serviceId: string, ip: string, ruleIdOrSequence: string | number): Promise<ApiResponse<any>> {
    return this.firewallClient.deleteRule(serviceId, ip, ruleIdOrSequence);
  }

  /**
   * Get firewall statistics for a specific IP
   * GET /api/services/{id}/firewall/{ip}/stats
   */
  async getFirewallStats(serviceId: string, ip: string): Promise<ApiResponse<FirewallStats[]>> {
    return this.firewallClient.getStats(serviceId, ip);
  }

  /**
   * Enable email notifications for a specific IP
   */
  async enableFirewallEmailNotifications(serviceId: string, ip: string): Promise<ApiResponse<any>> {
    return this.firewallClient.enableEmailNotifications(serviceId, ip);
  }

  /**
   * Disable email notifications for a specific IP
   */
  async disableFirewallEmailNotifications(serviceId: string, ip: string): Promise<ApiResponse<any>> {
    return this.firewallClient.disableEmailNotifications(serviceId, ip);
  }

  /**
   * Set Discord webhook URL for attack notifications
   */
  async setFirewallDiscordWebhook(serviceId: string, ip: string, webhookUrl: string): Promise<ApiResponse<any>> {
    return this.firewallClient.setDiscordWebhook(serviceId, ip, webhookUrl);
  }

  /**
   * Enable both email and Discord notifications
   */
  async enableAllFirewallNotifications(serviceId: string, ip: string, discordWebhookUrl?: string): Promise<ApiResponse<any>> {
    return this.firewallClient.enableAllNotifications(serviceId, ip, discordWebhookUrl);
  }

  /**
   * Disable all attack notifications for a specific IP
   */
  async disableAllFirewallNotifications(serviceId: string, ip: string): Promise<ApiResponse<any>> {
    return this.firewallClient.disableAllNotifications(serviceId, ip);
  }

  /**
   * Create a firewall rule for a specific port and application
   */
  async createFirewallPortRule(serviceId: string, targetIp: string, port: number, appId: number): Promise<ApiResponse<any>> {
    return this.firewallClient.createPortRule(serviceId, targetIp, port, appId);
  }

  // ============================================================================
  // Legacy access (backward compatibility)
  // ============================================================================

  /**
   * @deprecated Use direct methods instead. Will be removed in v2.0
   */
  get vps() {
    return this.vpsClient;
  }

  /**
   * @deprecated Use direct methods instead. Will be removed in v2.0
   */
  get user() {
    return this.userClient;
  }

  /**
   * @deprecated Use direct methods instead. Will be removed in v2.0
   */
  get dedicated() {
    return this.dedicatedClient;
  }

  /**
   * @deprecated Use direct methods instead. Will be removed in v2.0
   */
  get firewall() {
    return this.firewallClient;
  }
}
