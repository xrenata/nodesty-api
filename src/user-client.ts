import { HttpClient } from './http-client';
import {
  ApiConfig,
  ApiResponse,
  UserInfo,
  Service,
  TicketSummary,
  Ticket,
  InvoiceSummary,
  Invoice,
  UserSession
} from './types';

export class UserApiClient {
  private httpClient: HttpClient;

  constructor(config: ApiConfig) {
    this.httpClient = new HttpClient(config);
  }

  // ============================================================================
  // User Profile Operations
  // ============================================================================

  /**
   * Get current user profile information
   * GET /api/users/@me
   */
  async getCurrentUser(): Promise<ApiResponse<UserInfo>> {
    return this.httpClient.get<UserInfo>('/api/users/@me');
  }

  /**
   * Get user sessions
   * GET /api/users/@me/sessions
   */
  async getUserSessions(): Promise<ApiResponse<UserSession[]>> {
    return this.httpClient.get<UserSession[]>('/api/users/@me/sessions');
  }

  // ============================================================================
  // Services Operations
  // ============================================================================

  /**
   * Get all user services
   * GET /api/services
   */
  async getServices(): Promise<ApiResponse<Service[]>> {
    return this.httpClient.get<Service[]>('/api/services');
  }

  // ============================================================================
  // Tickets Operations
  // ============================================================================

  /**
   * Get all user tickets
   * GET /api/tickets
   */
  async getTickets(): Promise<ApiResponse<TicketSummary[]>> {
    return this.httpClient.get<TicketSummary[]>('/api/tickets');
  }

  /**
   * Get specific ticket by ID
   * GET /api/tickets/{id}
   */
  async getTicket(ticketId: string): Promise<ApiResponse<Ticket>> {
    return this.httpClient.get<Ticket>(`/api/tickets/${ticketId}`);
  }

  // ============================================================================
  // Invoices Operations
  // ============================================================================

  /**
   * Get all user invoices
   * GET /api/users/@me/invoices
   */
  async getInvoices(): Promise<ApiResponse<InvoiceSummary[]>> {
    return this.httpClient.get<InvoiceSummary[]>('/api/users/@me/invoices');
  }

  /**
   * Get specific invoice by ID
   * GET /api/users/@me/invoices/{id}
   */
  async getInvoice(invoiceId: number): Promise<ApiResponse<Invoice>> {
    return this.httpClient.get<Invoice>(`/api/users/@me/invoices/${invoiceId}`);
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
