import { useNavigate } from 'react-router-dom';
// ** Axios Imports
import Axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
// import apiClient from '../services/api';
import { demoPages } from '../menu';
import baseURL from './baseURL';
import apiClient from '../services/api';

export { useNavigate, demoPages, Cookies, baseURL, apiClient, Axios };
