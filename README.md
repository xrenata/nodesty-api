# Nodesty API Client

A TypeScript/JavaScript npm package for managing VPS servers through the Nodesty API.

## Installation

```bash
npm install nodesty-api
```

## Features

- ✅ **TypeScript Support** - Full type definitions included
- ✅ **JavaScript Compatible** - Works with both TypeScript and JavaScript
- ✅ **Promise-based** - Modern async/await support
- ✅ **Error Handling** - Comprehensive error handling with retry logic
- ✅ **VPS Management** - Complete VPS lifecycle management
- ✅ **Backup Operations** - Backup creation and restoration
- ✅ **Monitoring** - Resource usage and performance graphs
- ✅ **OS Templates** - Operating system management
- ✅ **Task Tracking** - Monitor long-running operations
- ✅ **User Management** - Account information and sessions
- ✅ **Service Management** - List all services
- ✅ **Ticket System** - Support ticket operations
- ✅ **Invoice Management** - Billing and invoice operations

## Quick Start

### TypeScript

```typescript
import { NodestyClient } from 'nodesty-api';

// Option 1: Use unified client (recommended)
const client = new NodestyClient({
  apiKey: 'your-nodesty-api-key'
});

// VPS operations
const vpsInfo = await client.vps.getVpsInfo('your-service-id');
if (vpsInfo.success) {
  console.log('VPS Info:', vpsInfo.data);
}

// User operations
const userProfile = await client.user.getCurrentUser();
if (userProfile.success) {
  console.log('User:', userProfile.data);
}

// Option 2: Use individual clients
import { VpsApiClient, UserApiClient } from 'nodesty-api';

const vpsClient = new VpsApiClient({
  apiKey: 'your-nodesty-api-key'
});

const userClient = new UserApiClient({
  apiKey: 'your-nodesty-api-key'
});

// Start VPS
await client.vps.startVps('your-service-id');

// Get monitoring data
const graphs = await client.vps.getVpsGraphs('your-service-id');
```

### JavaScript (CommonJS)

```javascript
const { VpsApiClient } = require('nodesty-api');

const client = new VpsApiClient({
  apiKey: 'your-nodesty-api-key'
});

// Promise-based usage
client.getVpsInfo('your-service-id')
  .then(vpsInfo => {
    if (vpsInfo.success) {
      console.log('VPS Info:', vpsInfo.data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## API Reference

### Configuration

```typescript
// Option 1: Unified client (recommended)
const client = new NodestyClient({
  apiKey: 'your-personal-access-token', // Required: Your Nodesty Personal Access Token
  baseUrl: 'https://nodesty.com',       // Optional: API base URL (default)
  timeout: 30000,                       // Optional: Request timeout in ms (default: 30000)
  retries: 3                           // Optional: Number of retry attempts (default: 3)
});

// Option 2: Individual clients
const vpsClient = new VpsApiClient({ apiKey: 'your-pat' });
const userClient = new UserApiClient({ apiKey: 'your-pat' });
```

### User Operations

#### Get Current User Profile
```typescript
const userProfile = await client.user.getCurrentUser();
if (userProfile.success) {
  console.log('User ID:', userProfile.data.id);
  console.log('Email:', userProfile.data.email);
  console.log('Name:', userProfile.data.firstName);
  console.log('Country:', userProfile.data.country);
}
```

#### Get All Services
```typescript
const services = await client.user.getServices();
if (services.success) {
  services.data.forEach(service => {
    console.log(`Service: ${service.name} (${service.type}) - ${service.status}`);
  });
}
```

#### Ticket Operations
```typescript
// Get all tickets
const tickets = await client.user.getTickets();

// Get specific ticket
const ticket = await client.user.getTicket('ticket-id');
```

#### Invoice Operations
```typescript
// Get all invoices
const invoices = await client.user.getInvoices();

// Get specific invoice
const invoice = await client.user.getInvoice('invoice-id');
```

#### User Sessions
```typescript
const sessions = await client.user.getUserSessions();
if (sessions.success) {
  sessions.data.forEach(session => {
    console.log(`Session: ${session.ip} - ${session.isActive ? 'Active' : 'Inactive'}`);
  });
}
```

### VPS Operations

#### Get VPS Information
```typescript
const vpsInfo = await client.vps.getVpsInfo(serviceId);
```

#### VPS Control
```typescript
// Start VPS (returns 204 on success)
await client.vps.startVps(serviceId);

// Stop VPS (returns 204 on success)
await client.vps.stopVps(serviceId);

// Restart VPS (returns 204 on success)
await client.vps.restartVps(serviceId);

// Power off VPS (returns 204 on success)
await client.vps.powerOffVps(serviceId);
```

#### Password Management
```typescript
await client.vps.changeVpsPassword(serviceId, {
  username: 'admin',
  password: 'StrongPassword123!'
});
```

#### Reinstall VPS
```typescript
// First get available OS templates to find the OS ID
const osTemplates = await client.vps.getVpsOsTemplates(serviceId);
// Example response: [{ "id": 1, "name": "Debian 9.5" }]

// Then reinstall with the OS ID
await client.vps.reinstallVps(serviceId, {
  password: 'StrongPassword123!',
  osId: 1  // Use the ID from OS templates
});
```

#### Get Available OS Templates
```typescript
const osTemplates = await client.vps.getVpsOsTemplates(serviceId);
if (osTemplates.success) {
  console.log('Available OS templates:', osTemplates.data);
  // Example response: [{ "id": 1, "name": "Debian 9.5" }]
}
```

### Monitoring & Graphs

```typescript
// Get performance graphs
const graphs = await client.vps.getVpsGraphs(serviceId);
```

### Backup Operations

```typescript
// Get all backups
const backups = await client.getVpsBackups(serviceId);

// Restore from backup
if (backups.success && backups.data && backups.data.length > 0) {
  const backup = backups.data[0];
  await client.restoreVpsBackupFromObject(serviceId, backup);
}
```

### OS Templates

```typescript
// Get available OS templates
const osTemplates = await client.getVpsOsTemplates(serviceId);

// Response structure:
// {
//   success: true,
//   data: [
//     {
//       id: 1,
//       name: "Debian 9.5"
//     },
//     {
//       id: 2,
//       name: "Ubuntu 20.04"
//     }
//   ]
// }
```

### Task Management

```typescript
// Get VPS tasks
const tasks = await client.getVpsTasks(serviceId);
if (tasks.success && tasks.data) {
  tasks.data.forEach(task => {
    console.log('Action:', task.action);
    console.log('Progress:', task.progress);
    console.log('Started:', new Date(task.startedAt));
    console.log('Ended:', new Date(task.endedAt));
  });
}
```

## API Response Format

All API methods return a standardized response format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## Error Handling

The client includes automatic retry logic with exponential backoff for failed requests. You can handle errors like this:

```typescript
try {
  const result = await client.getVpsInfo(serviceId);
  if (result.success) {
    // Handle success
    console.log(result.data);
  } else {
    // Handle API error
    console.error('API Error:', result.error);
  }
} catch (error) {
  // Handle network/other errors
  console.error('Network Error:', error);
}
```

## TypeScript Types

The package includes comprehensive TypeScript definitions:

```typescript
import type {
  VpsInfo,
  VpsActionParams,
  VpsBackup,
  VpsOsTemplate,
  VpsTask,
  VpsGraphs
} from 'nodesty-api';
```

## Requirements

- Node.js 16 or higher
- Valid Nodesty API key

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For API documentation and support, visit [Nodesty Documentation](https://nodesty.com/docs)
