// src/utils/fetchBlacklistData.js
const fetchBlacklistData = async (input) => {
  const services = [
    'zen.spamhaus.org',
    'bl.spamcop.net',
    'dnsbl.sorbs.net',
    'b.barracudacentral.org',
    'cbl.abuseat.org',
    'db.wpbl.info',
    'dnsbl-1.uceprotect.net',
    'dnsbl-2.uceprotect.net',
    'dnsbl-3.uceprotect.net',
    'dnsbl.inps.de',
    'dnsbl.sorbs.net',
    'dul.dnsbl.sorbs.net',
    'http.dnsbl.sorbs.net',
    'misc.dnsbl.sorbs.net',
    'smtp.dnsbl.sorbs.net',
    'web.dnsbl.sorbs.net',
    'dnsbl.spfbl.net',
    'psbl.surriel.com',
    'rbl.interserver.net',
    'sbl.spamhaus.org',
    'xbl.spamhaus.org',
    'ubl.unsubscore.com',
    'virbl.dnsbl.bit.nl',
    'dyna.spamrats.com',
    'spam.dnsbl.sorbs.net',
    'spamlist.or.kr',
    'pbl.spamhaus.org',
    'ubl.lashback.com',
    'dnsbl.ahbl.org',
    'dnsbl.kempt.net'
  ];

  // Function to check if the input is an IP address
  const isIP = (str) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(str);
  };

  // Function to resolve domain to IP address
  const resolveDomainToIP = async (domain) => {
    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();
      return data.Answer[0]?.data || null;
    } catch (error) {
      console.error('Error resolving domain to IP:', error);
      return null;
    }
  };

  // Validate input
  if (!isIP(input) && !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(input)) {
    throw new Error('Invalid input format. Please enter a valid domain name or IP address.');
  }

  const ip = isIP(input) ? input : await resolveDomainToIP(input);

  if (!ip) {
    throw new Error('Unable to resolve domain to IP.');
  }

  const results = await Promise.all(
    services.map(async (service) => {
      const startTime = new Date().getTime();
      try {
        const response = await fetch(`https://dns.google/resolve?name=${ip}.${service}&type=A`);
        const endTime = new Date().getTime();

        if (response.ok) {
          const data = await response.json();
          const isBlacklisted = data.Answer?.some((answer) => answer.data === '127.0.0.2');
          return {
            blacklist: service,
            status: isBlacklisted ? 'Blacklisted' : 'OK',
            reason: isBlacklisted ? 'Listed' : 'Not Listed',
            ttl: data.Answer?.[0].TTL,
            responseTime: endTime - startTime,
          };
        } else {
          return {
            blacklist: service,
            status: 'Error',
            reason: 'No response',
            ttl: null,
            responseTime: endTime - startTime,
          };
        }
      } catch (error) {
        console.error('Error fetching blacklist data:', error);
        return {
          blacklist: service,
          status: 'Error',
          reason: 'Fetch error',
          ttl: null,
          responseTime: new Date().getTime() - startTime,
        };
      }
    })
  );

  return results;
};

export default fetchBlacklistData;
