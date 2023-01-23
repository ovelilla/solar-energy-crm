// import axios from "axios";

// const axiosClient = axios.create({
//     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
// });

// export default axiosClient;

import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://solar-energy-backend.vercel.app/api",
});

export default axiosClient;
