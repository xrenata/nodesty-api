// This file shows example usage of the nodesty-api package
// This is not included in the published package but serves as documentation

import { NodestyClient } from './src/index';

async function examples() {
  // Initialize the unified client (recommended approach)
  const client = new NodestyClient({
    apiKey: 'your-personal-access-token-here',
    timeout: 30000,
    retries: 3
  });

  // Example service ID (replace with your actual VPS service ID)
  const serviceId = 'your-service-id-here';

  try {
    // Health check
    console.log('Checking API health...');
    const health = await client.healthCheck();
    console.log('Health:', health);

    // ============================================================================
    // User Account Operations
    // ============================================================================

    // Get current user profile
    console.log('Getting user profile...');
    const userProfile = await client.getCurrentUser();
    if (userProfile.success) {
      console.log('User Profile:', userProfile.data);
      // Example user profile structure:
      // {
      //   "id": "12345",
      //   "firstName": "John",
      //   "lastName": "Doe",
      //   "fullName": "John Doe",
      //   "email": "john.doe@example.com",
      //   "country": "US",
      //   "city": "New York",
      //   "state": "NY",
      //   "address": "123 Main St",
      //   "postCode": "10001",
      //   "currency": "USD",
      //   "currencySymbol": "$",
      //   "phoneNumber": "+1 1234567890",
      //   "tckn": "12345678901",
      //   "birthYear": "1990",
      //   "banned": false,
      //   "currentSessionId": "abcdef123456",
      //   "totpEnabled": true,
      //   "stats": {
      //     "activeServices": 5,
      //     "unpaidInvoices": 2,
      //     "balance": 150.75,
      //     "activeTickets": 1
      //   },
      //   "companyName": "Example Corp"
      // }
    }

    // Get all services
    console.log('Getting all services...');
    const services = await client.getServices();
    if (services.success) {
      console.log('Services:', services.data);
      // Example services structure:
      // {
      //   "id": 1,
      //   "productId": 123,
      //   "groupId": 456,
      //   "name": "Dedicated Server - i7-7700",
      //   "rawName": "Fiziksel Sunucu - i7-7700",
      //   "domain": "abcdefgh.nodesty.com",
      //   "firstPaymentAmount": 100,
      //   "recurringAmount": 50,
      //   "billingCycle": "Monthly",
      //   "nextDueDate": 1704067200000,
      //   "status": "Active",
      //   "username": "user123",
      //   "password": "securepassword123",
      //   "vpsId": 12345,
      //   "dedicatedId": ["s100", "28572"],
      //   "isVPS": true,
      //   "isWebHosting": false,
      //   "isDedicated": true,
      //   "isHetznerDedicated": true,
      //   "isSkyLinkDedicated": false,
      //   "addons": [
      //     {
      //       "name": "2x IPv4 Addresses",
      //       "recurringAmount": 10,
      //       "billingCycle": "Monthly",
      //       "status": "Active",
      //       "registerDate": 1704067200000,
      //       "nextDueDate": 1704067200000
      //     }
      //   ],
      //   "features": [
      //     "Unlimited Bandwidth",
      //     "24/7 Support",
      //     "Free SSL Certificate"
      //   ]
      // }
    }

    // Get user tickets
    console.log('Getting user tickets...');
    const tickets = await client.getTickets();
    if (tickets.success) {
      console.log('Tickets:', tickets.data);
      // Example tickets list structure:
      // [
      //   {
      //     "id": "1",
      //     "subject": "Issue with my VPS",
      //     "status": "OPEN",
      //     "priority": "HIGH",
      //     "authorId": "12345",
      //     "lastReply": "2023-10-01T12:00:00Z"
      //   }
      // ]
      
      // Get specific ticket
      if (tickets.data && tickets.data.length > 0) {
        const ticketId = tickets.data[0].id;
        const ticket = await client.getTicket(ticketId);
        console.log('Specific ticket:', ticket.data);
        // Example ticket structure:
        // {
        //   "id": "1",
        //   "subject": "Issue with my VPS",
        //   "status": "OPEN",
        //   "priority": "HIGH",
        //   "authorId": "12345",
        //   "lastReply": "2023-10-01T12:00:00Z",
        //   "marked": true,
        //   "messages": [
        //     {
        //       "id": "1",
        //       "messageId": "346534763346",
        //       "content": "This is a message content.",
        //       "attachments": ["https://example.com/attachment.jpg"],
        //       "authorId": "12345",
        //       "createdAt": "2023-10-01T12:00:00Z",
        //       "author": {
        //         "id": "12345",
        //         "avatar": "https://example.com/avatar.jpg",
        //         "name": "John Doe",
        //         "role": "USER"
        //       }
        //     }
        //   ]
        // }
      }
    }

    // Get user invoices
    console.log('Getting user invoices...');
    const invoices = await client.getInvoices();
    if (invoices.success) {
      console.log('Invoices:', invoices.data);
      // Example invoices list structure:
      // [
      //   {
      //     "id": 1,
      //     "dueDate": 1700000000000,
      //     "datePaid": 1700000000000,
      //     "subTotal": 100,
      //     "total": 120,
      //     "status": "Unpaid",
      //     "currency": "USD",
      //     "appliedBalance": 20
      //   }
      // ]
      
      // Get specific invoice
      if (invoices.data && invoices.data.length > 0) {
        const invoiceId = invoices.data[0].id;
        const invoice = await client.getInvoice(Number(invoiceId));
        console.log('Specific invoice:', invoice.data);
        // Example invoice structure:
        // {
        //   "id": 1,
        //   "dueDate": 1700000000000,
        //   "datePaid": 1700000000000,
        //   "subTotal": 100,
        //   "total": 120,
        //   "status": "Unpaid",
        //   "appliedBalance": 20,
        //   "items": [
        //     {
        //       "id": 1,
        //       "type": "Hosting",
        //       "description": "Web Hosting Service",
        //       "amount": 10
        //     }
        //   ]
        // }
      }
    }

    // Get user sessions
    console.log('Getting user sessions...');
    const sessions = await client.getUserSessions();
    if (sessions.success) {
      console.log('Sessions:', sessions.data);
      // Example sessions structure:
      // [
      //   {
      //     "id": "string",
      //     "ip": "192.168.1.1",
      //     "location": "New York, USA",
      //     "os": "Desktop",
      //     "platform": "Chrome",
      //     "lastSeen": "2023-10-01T12:00:00Z"
      //   }
      // ]
    }

    // ============================================================================
    // VPS Operations
    // ============================================================================

    // Get VPS information
    console.log('Getting VPS info...');
    const vpsInfo = await client.getVpsInfo(serviceId);
    if (vpsInfo.success) {
      console.log('VPS Info:', vpsInfo.data);
      // Example VPS info structure:
      // {
      //   "vpsId": 12345,
      //   "proxmoxId": 67890,
      //   "hostname": "vps.example.com",
      //   "osReinstallLimit": 3,
      //   "status": true,
      //   "vnc": { "enabled": true, "ip": "192.168.1.100", "port": "5900", "password": "securepassword123" },
      //   "os": { "name": "Ubuntu 20.04", "distro": "ubuntu" },
      //   "disk": { "limit": 10737418240, "used": 5368709120, "free": 5368709120, "percent": 50 },
      //   "ips": ["192.168.1.100"],
      //   "cpu": { "manu": "Intel", "limit": 2000, "used": 1500, "free": 500, "percent": 75.5, "cores": 4 },
      //   "ram": { "limit": 2147483648, "used": 1073741824, "free": 1073741824, "percent": 50 },
      //   "inode": { "limit": 100000, "used": 50000, "free": 50000, "percent": 50 },
      //   "netspeed": { "in": 100, "out": 100 },
      //   "bandwidth": {
      //     "total": { "usage": 10737418240, "in": 5368709120, "out": 5368709120 },
      //     "usage": [104857600], "in": [52428800], "out": [52428800],
      //     "categories": ["2025-06-26T20:56:30.932Z"]
      //   }
      // }
    }

    // Get VPS monitoring data/graphs
    console.log('Getting VPS graphs...');
    const graphs = await client.getVpsGraphs(serviceId);
    if (graphs.success) {
      console.log('VPS Graphs:', graphs.data);
      // Example graph structure:
      // {
      //   "avgDownload": 123456,
      //   "avgUpload": 654321,
      //   "avgIoRead": 789012,
      //   "avgIoWrite": 345678,
      //   "cpuUsage": { "timestamp1": 4.25, "timestamp2": 5.30 },
      //   "ramUsage": { "timestamp1": 2097152, "timestamp2": 2048000 },
      //   "diskUsage": { "timestamp1": 5242880, "timestamp2": 5300000 },
      //   "ioSpeed": {
      //     "read": [1024, 1100],
      //     "write": [2048, 2200],
      //     "categories": [1625251200000, 1625251260000]
      //   },
      //   "networkSpeed": {
      //     "download": [512, 600],
      //     "upload": [256, 300],
      //     "categories": [1625251200000, 1625251260000]
      //   }
      // }
    }

    // VPS Control Operations
    console.log('VPS control operations...');
    
    // Start VPS (Status: 204 on success)
    const startResult = await client.startVps(serviceId);
    console.log('Start result:', startResult);

    // Stop VPS (Status: 204 on success)
    const stopResult = await client.stopVps(serviceId);
    console.log('Stop result:', stopResult);

    // Restart VPS (Status: 204 on success)
    const restartResult = await client.restartVps(serviceId);
    console.log('Restart result:', restartResult);

    // Power off VPS (Status: 204 on success)
    const powerOffResult = await client.powerOffVps(serviceId);
    console.log('Power off result:', powerOffResult);

    // Get available OS templates
    console.log('Getting available OS templates...');
    const osTemplates = await client.getVpsOsTemplates(serviceId);
    if (osTemplates.success) {
      console.log('OS Templates:', osTemplates.data);
      
      // Example OS template structure:
      // [
      //   {
      //     "id": 1,
      //     "name": "Debian 9.5"
      //   },
      //   {
      //     "id": 2,
      //     "name": "Ubuntu 20.04"
      //   }
      // ]
    }

    // Backup operations
    console.log('Backup operations...');
    
    // Get backups (returns array of backup objects with date, file, and createdAt)
    const backups = await client.getVpsBackups(serviceId);
    if (backups.success && backups.data) {
      console.log('VPS Backups:', backups.data);
      
      // Example backup structure:
      // [
      //   {
      //     "date": "2025-05-27",
      //     "file": "vzdump-qemu-500-2025_05_27-04_13_58.vma",
      //     "createdAt": 1625251200000
      //   }
      // ]
      
      // Restore from backup (Status: 204 on success)
      if (backups.data.length > 0) {
        const backup = backups.data[0];
        console.log('Restoring from backup...');
        const restoreResult = await client.restoreVpsBackupFromObject(serviceId, backup);
        console.log('Restore result:', restoreResult);
      }
    }

    // Get VPS tasks
    console.log('Getting VPS tasks...');
    const tasks = await client.getVpsTasks(serviceId);
    if (tasks.success) {
      console.log('VPS Tasks:', tasks.data);
      // Example task structure:
      // [
      //   {
      //     "action": "VM reboot initiated",
      //     "progress": "50%",
      //     "startedAt": 1625251200000,
      //     "endedAt": 1625254800000
      //   }
      // ]
    }

    // Change VPS password
    console.log('Changing VPS password...');
    const passwordResult = await client.changeVpsPassword(serviceId, {
      username: 'admin',
      password: 'StrongPassword123!'
    });
    console.log('Password change result:', passwordResult);

    // Reinstall VPS with new OS
    console.log('Reinstalling VPS...');
    const reinstallResult = await client.reinstallVps(serviceId, {
      password: 'StrongPassword123!',
      osId: 1  // Use OS ID from getVpsOsTemplates()
    });
    console.log('Reinstall result:', reinstallResult);

    // ============================================================================
    // Dedicated Server Operations
    // ============================================================================

    // Get dedicated server information
    console.log('Getting dedicated server info...');
    const dedicatedInfo = await client.getDedicatedInfo(serviceId);
    if (dedicatedInfo.success) {
      console.log('Dedicated Server Info:', dedicatedInfo.data);
    }

    // Get dedicated server hardware information
    console.log('Getting dedicated server hardware...');
    const dedicatedHardware = await client.getDedicatedHardware(serviceId);
    if (dedicatedHardware.success) {
      console.log('Hardware Info:', dedicatedHardware.data);
      // Example hardware structure:
      // [
      //   {
      //     "component": "CPU Model",
      //     "model": "AMD Ryzen 9 9950X",
      //     "value": 5000,
      //     "valueSuffix": " MHz"
      //   },
      //   {
      //     "component": "RAM",
      //     "model": "DDR4 ECC Memory",
      //     "value": 32,
      //     "valueSuffix": " GB"
      //   },
      //   {
      //     "component": "Storage",
      //     "model": "NVMe SSD",
      //     "value": 1000,
      //     "valueSuffix": " GB"
      //   }
      // ]
    }

    // Get dedicated server OS templates
    console.log('Getting dedicated server OS templates...');
    const dedicatedOsTemplates = await client.getDedicatedOsTemplates(serviceId);
    if (dedicatedOsTemplates.success) {
      console.log('Available OS Templates:', dedicatedOsTemplates.data);
    }

    // Get dedicated server tasks
    console.log('Getting dedicated server tasks...');
    const dedicatedTasks = await client.getDedicatedTasks(serviceId);
    if (dedicatedTasks.success) {
      console.log('Dedicated Server Tasks:', dedicatedTasks.data);
    }

    // Get dedicated server reinstall status
    console.log('Getting dedicated server reinstall status...');
    const reinstallStatus = await client.getDedicatedReinstallStatus(serviceId);
    if (reinstallStatus.success) {
      console.log('Reinstall Status:', reinstallStatus.data);
    }

    // Dedicated server actions
    console.log('Performing dedicated server actions...');
    // await client.startDedicated(serviceId);        // setPowerOn
    // await client.restartDedicated(serviceId);      // setPowerReset
    // await client.stopDedicated(serviceId);         // setPowerOff
    
    // Or use the generic action method with specific actions
    // await client.dedicatedAction(serviceId, { action: 'setPowerOn' });
    // await client.dedicatedAction(serviceId, { action: 'setPowerReset' });
    // await client.dedicatedAction(serviceId, { action: 'setPowerOff' });
    
    // Reinstall dedicated server (commented out for safety)
    // await client.reinstallDedicated(serviceId, {
    //   password: 'StrongPassword123!',
    //   osId: 1
    // });

    // ========================================================================
    // Firewall Operations
    // ========================================================================
    
    const firewallIp = '192.168.1.100'; // Example IP address
    
    console.log('Testing firewall operations...');

    // Get firewall attack logs
    console.log('Getting firewall attack logs...');
    const attackLogs = await client.getFirewallAttackLogs(serviceId, firewallIp);
    if (attackLogs.success) {
      console.log('Attack Logs:', attackLogs.data);
    }

    // Get firewall statistics
    console.log('Getting firewall statistics...');
    const firewallStats = await client.getFirewallStats(serviceId, firewallIp);
    if (firewallStats.success) {
      console.log('Firewall Stats:', firewallStats.data);
      // Example stats structure:
      // [
      //   {
      //     "timestamp": "2025-06-26T20:56:30.932Z",
      //     "totalPassTraffic": "10248576",
      //     "totalDropTraffic": "2048576"
      //   }
      // ]
    }

    // Get attack notification settings
    console.log('Getting attack notification settings...');
    const attackNotification = await client.getFirewallAttackNotification(serviceId, firewallIp);
    if (attackNotification.success) {
      console.log('Attack Notification Settings:', attackNotification.data);
    }

    // Get rDNS settings
    console.log('Getting rDNS settings...');
    const rdnsSettings = await client.getFirewallRdns(serviceId, firewallIp);
    if (rdnsSettings.success) {
      console.log('rDNS Settings:', rdnsSettings.data);
    }

    // Get firewall rules
    console.log('Getting firewall rules...');
    const firewallRules = await client.getFirewallRules(serviceId, firewallIp);
    if (firewallRules.success) {
      console.log('Firewall Rules:', firewallRules.data);
    }

    // Example firewall operations (commented out for safety)
    // Enable attack notifications
    // await client.enableFirewallAttackNotifications(serviceId, firewallIp, 'admin@example.com', 10);
    
    // Update rDNS hostname
    // await client.updateFirewallRdns(serviceId, firewallIp, {
    //   rdns: 'server.example.com'
    // });
    
    // Create firewall rules
    // await client.createFirewallRule(serviceId, firewallIp, {
    //   port: 25565,
    //   appId: 123
    // });
    // await client.createFirewallPortRule(serviceId, firewallIp, 25565, 123);

  } catch (error) {
    console.error('Error in examples:', error);
  }
}

// For JavaScript usage (CommonJS)
function javascriptExample() {
  const { NodestyClient } = require('./dist/index.js');
  
  // Initialize the unified client
  const client = new NodestyClient({
    apiKey: 'your-personal-access-token-here'
  });

  const serviceId = 'your-service-id-here';

  // Promise-based usage with direct methods
  client.getVpsInfo(serviceId)
    .then(vpsInfo => {
      if (vpsInfo.success) {
        console.log('VPS Info:', vpsInfo.data);
      } else {
        console.error('Error:', vpsInfo.error);
      }
    })
    .catch(error => {
      console.error('Request failed:', error);
    });

  // User operations
  client.getCurrentUser()
    .then(user => {
      if (user.success) {
        console.log('User:', user.data);
        return client.getServices();
      }
    })
    .then(services => {
      if (services && services.success) {
        console.log('Services:', services.data);
      }
    })
    .catch(error => {
      console.error('User operations error:', error);
    });

  // Control VPS with promises
  client.startVps(serviceId)
    .then(result => {
      console.log('VPS started:', result);
      return client.stopVps(serviceId);
    })
    .then(result => {
      console.log('VPS stopped:', result);
    })
    .catch(error => {
      console.error('VPS control error:', error);
    });
}

// Run examples only if this file is executed directly
if (require.main === module) {
  examples();
}

export { examples, javascriptExample };