chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'purchaseAttempted') {
      // Log purchase attempt
      chrome.storage.local.get(['purchaseHistory'], (result) => {
        const history = result.purchaseHistory || [];
        history.push({
          timestamp: request.timestamp,
          url: request.url,
          completedChecklist: true
        });
        
        chrome.storage.local.set({ purchaseHistory: history });
      });
      
      // Get current month's purchase attempts
      const currentMonth = new Date().getMonth();
      chrome.storage.local.get(['monthlyStats'], (result) => {
        const stats = result.monthlyStats || {};
        if (!stats[currentMonth]) {
          stats[currentMonth] = { attempts: 0, completions: 0 };
        }
        stats[currentMonth].attempts++;
        chrome.storage.local.set({ monthlyStats: stats });
      });
    }
  });