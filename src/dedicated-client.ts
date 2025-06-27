import { HttpClient } from './http-client';
import {
  ApiConfig,
  ApiResponse,
  DedicatedInfo,
  DedicatedHardware,
  DedicatedActionParams,
  DedicatedOsTemplate,
  DedicatedReinstallParams,
  DedicatedReinstallStatus,
  DedicatedTask
} from './types';

export class DedicatedApiClient {
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
  // Dedicated Server Information
  // ============================================================================

  /**
   * Get dedicated server information
   * GET /api/services/{id}/dedicated/info
   */
  async getDedicatedInfo(serviceId: string): Promise<ApiResponse<DedicatedInfo>> {
    return this.httpClient.get<DedicatedInfo>(`/api/services/${serviceId}/dedicated/info`);
  }

  /**
   * Get dedicated server hardware information
   * GET /api/services/{id}/dedicated/hardware
   */
  async getDedicatedHardware(serviceId: string): Promise<ApiResponse<DedicatedHardware[]>> {
    return this.httpClient.get<DedicatedHardware[]>(`/api/services/${serviceId}/dedicated/hardware`);
  }

  // ============================================================================
  // Dedicated Server Actions
  // ============================================================================

  /**
   * Perform action on dedicated server
   * POST /api/services/{id}/dedicated/action
   */
  async dedicatedAction(serviceId: string, params: DedicatedActionParams): Promise<ApiResponse<any>> {
    return this.httpClient.post<any>(`/api/services/${serviceId}/dedicated/action`, params);
  }

  /**
   * Power on dedicated server
   */
  async startDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.dedicatedAction(serviceId, { action: 'setPowerOn' });
  }

  /**
   * Power off dedicated server
   */
  async stopDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.dedicatedAction(serviceId, { action: 'setPowerOff' });
  }

  /**
   * Reset/restart dedicated server
   */
  async restartDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.dedicatedAction(serviceId, { action: 'setPowerReset' });
  }

  /**
   * Reset dedicated server (alias for restart)
   */
  async resetDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.restartDedicated(serviceId);
  }

  /**
   * Power off dedicated server (alias for stop)
   */
  async poweroffDedicated(serviceId: string): Promise<ApiResponse<any>> {
    return this.stopDedicated(serviceId);
  }

  // ============================================================================
  // OS Management
  // ============================================================================

  /**
   * Get available OS templates for dedicated server
   * GET /api/services/{id}/dedicated/os-templates
   */
  async getDedicatedOsTemplates(serviceId: string): Promise<ApiResponse<DedicatedOsTemplate[]>> {
    return this.httpClient.get<DedicatedOsTemplate[]>(`/api/services/${serviceId}/dedicated/os-templates`);
  }

  /**
   * Reinstall dedicated server with new OS
   * POST /api/services/{id}/dedicated/reinstall
   */
  async reinstallDedicated(serviceId: string, params: DedicatedReinstallParams): Promise<ApiResponse<any>> {
    return this.httpClient.post<any>(`/api/services/${serviceId}/dedicated/reinstall`, params);
  }

  /**
   * Get dedicated server reinstall status
   * GET /api/services/{id}/dedicated/reinstall-status
   */
  async getDedicatedReinstallStatus(serviceId: string): Promise<ApiResponse<DedicatedReinstallStatus>> {
    return this.httpClient.get<DedicatedReinstallStatus>(`/api/services/${serviceId}/dedicated/reinstall-status`);
  }

  // ============================================================================
  // Task Management
  // ============================================================================

  /**
   * Get dedicated server tasks
   * GET /api/services/{id}/dedicated/tasks
   */
  async getDedicatedTasks(serviceId: string): Promise<ApiResponse<DedicatedTask[]>> {
    return this.httpClient.get<DedicatedTask[]>(`/api/services/${serviceId}/dedicated/tasks`);
  }
}
