import { HttpClient } from './http-client';
import {
  ApiConfig,
  ApiResponse,
  VpsInfo,
  VpsActionParams,
  VpsChangePasswordParams,
  VpsReinstallParams,
  VpsBackup,
  VpsBackupRestoreParams,
  VpsOsTemplate,
  VpsTask,
  VpsGraphs
} from './types';

export class VpsApiClient {
  private httpClient: HttpClient;

  constructor(config: ApiConfig) {
    this.httpClient = new HttpClient(config);
  }

  // ============================================================================
  // VPS Operations
  // ============================================================================

  /**
   * Get VPS service information
   * GET /api/services/{id}/vps/info
   */
  async getVpsInfo(serviceId: string): Promise<ApiResponse<VpsInfo>> {
    return this.httpClient.get<VpsInfo>(`/api/services/${serviceId}/vps/info`);
  }

  /**
   * Perform VPS action (start, stop, restart, suspend, etc.)
   * POST /api/services/{id}/vps/action
   */
  async performVpsAction(serviceId: string, params: VpsActionParams): Promise<ApiResponse<any>> {
    return this.httpClient.post(`/api/services/${serviceId}/vps/action`, params);
  }

  /**
   * Start VPS server
   */
  async startVps(serviceId: string): Promise<ApiResponse<any>> {
    return this.performVpsAction(serviceId, { action: 'start' });
  }

  /**
   * Stop VPS server
   */
  async stopVps(serviceId: string): Promise<ApiResponse<any>> {
    return this.performVpsAction(serviceId, { action: 'stop' });
  }

  /**
   * Restart VPS server
   */
  async restartVps(serviceId: string): Promise<ApiResponse<any>> {
    return this.performVpsAction(serviceId, { action: 'restart' });
  }

  /**
   * Power off VPS server
   */
  async powerOffVps(serviceId: string): Promise<ApiResponse<any>> {
    return this.performVpsAction(serviceId, { action: 'poweroff' });
  }

  /**
   * Change VPS password
   * POST /api/services/{id}/vps/change-password
   */
  async changeVpsPassword(serviceId: string, params: VpsChangePasswordParams): Promise<ApiResponse<any>> {
    return this.httpClient.post(`/api/services/${serviceId}/vps/change-password`, params);
  }

  /**
   * Get VPS graphs/monitoring data
   * GET /api/services/{id}/vps/graphs
   * Returns comprehensive usage statistics including CPU, RAM, disk, network and I/O data
   */
  async getVpsGraphs(serviceId: string): Promise<ApiResponse<VpsGraphs>> {
    return this.httpClient.get<VpsGraphs>(`/api/services/${serviceId}/vps/graphs`);
  }

  /**
   * Reinstall VPS with new OS template
   * POST /api/services/{id}/vps/reinstall
   */
  async reinstallVps(serviceId: string, params: VpsReinstallParams): Promise<ApiResponse<any>> {
    return this.httpClient.post(`/api/services/${serviceId}/vps/reinstall`, params);
  }

  // ============================================================================
  // Backup Operations
  // ============================================================================

  /**
   * Get VPS backups
   * GET /api/services/{id}/vps/backups
   */
  async getVpsBackups(serviceId: string): Promise<ApiResponse<VpsBackup[]>> {
    return this.httpClient.get<VpsBackup[]>(`/api/services/${serviceId}/vps/backups`);
  }

  /**
   * Restore VPS from backup
   * POST /api/services/{id}/vps/backups/{date}/{file}
   * Note: Date and file are sent both in URL path and request body
   */
  async restoreVpsBackup(serviceId: string, date: string, file: string): Promise<ApiResponse<any>> {
    const body = { date, file };
    return this.httpClient.post(`/api/services/${serviceId}/vps/backups/${date}/${file}`, body);
  }

  /**
   * Restore VPS from backup using backup object
   * POST /api/services/{id}/vps/backups/{date}/{file}
   */
  async restoreVpsBackupFromObject(serviceId: string, backup: VpsBackup): Promise<ApiResponse<any>> {
    return this.restoreVpsBackup(serviceId, backup.date, backup.file);
  }

  // ============================================================================
  // OS Templates
  // ============================================================================

  /**
   * Get available OS templates
   * GET /api/services/{id}/vps/os-templates
   */
  async getVpsOsTemplates(serviceId: string): Promise<ApiResponse<VpsOsTemplate[]>> {
    return this.httpClient.get<VpsOsTemplate[]>(`/api/services/${serviceId}/vps/os-templates`);
  }

  // ============================================================================
  // Tasks
  // ============================================================================

  /**
   * Get VPS tasks
   * GET /api/services/{id}/vps/tasks
   */
  async getVpsTasks(serviceId: string): Promise<ApiResponse<VpsTask[]>> {
    return this.httpClient.get<VpsTask[]>(`/api/services/${serviceId}/vps/tasks`);
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Health check
   */
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.httpClient.get<{ status: string; timestamp: string }>('/health');
  }
}
