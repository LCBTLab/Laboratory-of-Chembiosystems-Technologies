const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Helper function to make authenticated requests
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const data = await authFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token);
    }
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await authFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token);
    }
    return data;
  },

  logout: async () => {
    await authFetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: async () => {
    return authFetch('/api/auth/me');
  },
};

// Profiles API
export const profilesAPI = {
  getAll: async (activeOnly: boolean = true) => {
    return authFetch(`/api/profiles?active_only=${activeOnly}`);
  },

  getById: async (id: string) => {
    return authFetch(`/api/profiles/${id}`);
  },

  update: async (id: string, data: any) => {
    return authFetch(`/api/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    return authFetch('/api/projects');
  },

  getById: async (id: string) => {
    return authFetch(`/api/projects/${id}`);
  },

  create: async (data: any) => {
    return authFetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authFetch(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authFetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// Publications API
export const publicationsAPI = {
  getAll: async () => {
    return authFetch('/api/publications');
  },

  getById: async (id: string) => {
    return authFetch(`/api/publications/${id}`);
  },

  create: async (data: any) => {
    return authFetch('/api/publications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authFetch(`/api/publications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authFetch(`/api/publications/${id}`, {
      method: 'DELETE',
    });
  },
};

// Resources API
export const resourcesAPI = {
  getAll: async (publicOnly: boolean = true) => {
    return authFetch(`/api/resources?public_only=${publicOnly}`);
  },

  getById: async (id: string) => {
    return authFetch(`/api/resources/${id}`);
  },

  create: async (data: any) => {
    return authFetch('/api/resources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authFetch(`/api/resources/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authFetch(`/api/resources/${id}`, {
      method: 'DELETE',
    });
  },
};

// Announcements API
export const announcementsAPI = {
  getAll: async (publishedOnly: boolean = true) => {
    return authFetch(`/api/announcements?published_only=${publishedOnly}`);
  },

  getById: async (id: string) => {
    return authFetch(`/api/announcements/${id}`);
  },

  create: async (data: any) => {
    return authFetch('/api/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authFetch(`/api/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authFetch(`/api/announcements/${id}`, {
      method: 'DELETE',
    });
  },
};
