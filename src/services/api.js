import axios from 'axios';

const apiClient = axios.create({
	// baseURL: 'http://thesfb.live/MMH-Backend',
	baseURL: 'http://192.168.18.45/MeeluBackend', // Atif // atif
	// baseURL: 'http://192.168.18.81/MMH-Backend', // Khalil
	// baseURL: 'http://localhost/MMH-Backend', // Local
	// baseURL: 'http://192.168.18.86/MMH-Backend', // Husnain
	// baseURL: 'http://localhost/MMH-Backend',
	headers: {
		// 'X-Requested-With': 'XMLHttpRequest',
		// Authorization: `Bearer 123`,
	},
	// withCredentials: true,
});
export default apiClient;
