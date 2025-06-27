import { HttpClient } from './http-client';
import {
  ApiConfig,
  ApiResponse,
  FirewallAttackLog,
  FirewallAttackNotification,
  FirewallAttackNotificationParams,
  FirewallRdns,
  FirewallRdnsParams,
  FirewallRule,
  FirewallRuleParams,
  FirewallStats
} from './types';

export class FirewallApiClient {
  private httpClient: HttpClient;

  constructor(config: ApiConfig) {
    this.httpClient = new HttpClient(config);
  }

  /**
   * Update API key
   */
  updateApiKey(newApiKey: string): void {
    this.httpClient.updateApiKey(newApiKey);
  }

  // ============================================================================
  // Firewall Attack Logs
  // ============================================================================

  /**
   * Get firewall attack logs for a specific IP
   * GET /api/services/{id}/firewall/{ip}/attack-logs
   */
  async getAttackLogs(serviceId: string, ip: string): Promise<ApiResponse<FirewallAttackLog[]>> {
    return this.httpClient.get<FirewallAttackLog[]>(`/api/services/${serviceId}/firewall/${ip}/attack-logs`);
  }

  // ============================================================================
  // Firewall Attack Notifications
  // ============================================================================

  /**
   * Get attack notification settings for a specific IP
   * GET /api/services/{id}/firewall/{ip}/attack-notification
   */
  async getAttackNotification(serviceId: string, ip: string): Promise<ApiResponse<FirewallAttackNotification>> {
    return this.httpClient.get<FirewallAttackNotification>(`/api/services/${serviceId}/firewall/${ip}/attack-notification`);
  }

  /**
   * Update attack notification settings for a specific IP
   * PUT /api/services/{id}/firewall/{ip}/attack-notification
   */
  async updateAttackNotification(serviceId: string, ip: string, params: FirewallAttackNotificationParams): Promise<ApiResponse<any>> {
    return this.httpClient.put<any>(`/api/services/${serviceId}/firewall/${ip}/attack-notification`, params);
  }

  // ============================================================================
  // Firewall rDNS Management
  // ============================================================================

  /**
   * Get rDNS settings for a specific IP
   * GET /api/services/{id}/firewall/{ip}/rdns
   */
  async getRdns(serviceId: string, ip: string): Promise<ApiResponse<FirewallRdns>> {
    return this.httpClient.get<FirewallRdns>(`/api/services/${serviceId}/firewall/${ip}/rdns`);
  }

  /**
   * Update rDNS settings for a specific IP
   * PUT /api/services/{id}/firewall/{ip}/rdns
   */
  async updateRdns(serviceId: string, ip: string, params: FirewallRdnsParams): Promise<ApiResponse<any>> {
    return this.httpClient.put<any>(`/api/services/${serviceId}/firewall/${ip}/rdns`, params);
  }

  /**
   * Delete rDNS settings for a specific IP
   * DELETE /api/services/{id}/firewall/{ip}/rdns
   */
  async deleteRdns(serviceId: string, ip: string): Promise<ApiResponse<any>> {
    return this.httpClient.delete<any>(`/api/services/${serviceId}/firewall/${ip}/rdns`);
  }

  // ============================================================================
  // Firewall Rules Management
  // ============================================================================

  /**
   * Get all firewall rules for a specific IP
   * GET /api/services/{id}/firewall/{ip}/rules
   */
  async getRules(serviceId: string, ip: string): Promise<ApiResponse<FirewallRule[]>> {
    return this.httpClient.get<FirewallRule[]>(`/api/services/${serviceId}/firewall/${ip}/rules`);
  }

  /**
   * Create a new firewall rule for a specific IP
   * POST /api/services/{id}/firewall/{ip}/rules
   * Body: { "port": number, "appId": number }
   */
  async createRule(serviceId: string, ip: string, params: FirewallRuleParams): Promise<ApiResponse<any>> {
    return this.httpClient.post<any>(`/api/services/${serviceId}/firewall/${ip}/rules`, params);
  }

  /**
   * Delete a firewall rule by ID or sequence number
   * DELETE /api/services/{id}/firewall/{ip}/rules/{ruleIdOrSequence}
   */
  async deleteRule(serviceId: string, ip: string, ruleIdOrSequence: string | number): Promise<ApiResponse<any>> {
    return this.httpClient.delete<any>(`/api/services/${serviceId}/firewall/${ip}/rules/${ruleIdOrSequence}`);
  }

  // ============================================================================
  // Firewall Statistics
  // ============================================================================

  /**
   * Get firewall statistics for a specific IP
   * GET /api/services/{id}/firewall/{ip}/stats
   */
  async getStats(serviceId: string, ip: string): Promise<ApiResponse<FirewallStats[]>> {
    return this.httpClient.get<FirewallStats[]>(`/api/services/${serviceId}/firewall/${ip}/stats`);
  }

  // ============================================================================
  // Convenience Methods
  // ============================================================================

  /**
   * Enable email notifications for a specific IP
   */
  async enableEmailNotifications(serviceId: string, ip: string): Promise<ApiResponse<any>> {
    return this.updateAttackNotification(serviceId, ip, {
      emailNotification: true
    });
  }

  /**
   * Disable email notifications for a specific IP
   */
  async disableEmailNotifications(serviceId: string, ip: string): Promise<ApiResponse<any>> {
    return this.updateAttackNotification(serviceId, ip, {
      emailNotification: false
    });
  }

  /**
   * Set Discord webhook URL for attack notifications
   */
  async setDiscordWebhook(serviceId: string, ip: string, webhookUrl: string): Promise<ApiResponse<any>> {
    return this.updateAttackNotification(serviceId, ip, {
      discordWebhookURL: webhookUrl
    });
  }

  /**
   * Enable both email and Discord notifications
   */
  async enableAllNotifications(serviceId: string, ip: string, discordWebhookUrl?: string): Promise<ApiResponse<any>> {
    return this.updateAttackNotification(serviceId, ip, {
      emailNotification: true,
      discordWebhookURL: discordWebhookUrl || ''
    });
  }

  /**
   * Disable all attack notifications for a specific IP
   */
  async disableAllNotifications(serviceId: string, ip: string): Promise<ApiResponse<any>> {
    return this.updateAttackNotification(serviceId, ip, {
      emailNotification: false,
      discordWebhookURL: ''
    });
  }

  /**
   * Create a firewall rule for a specific port and application
   */
  async createPortRule(serviceId: string, targetIp: string, port: number, appId: number): Promise<ApiResponse<any>> {
    return this.createRule(serviceId, targetIp, {
      port,
      appId
    });
  }
}
