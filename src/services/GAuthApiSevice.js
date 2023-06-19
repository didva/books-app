const GAuthApiService = () => {
    return {
        getUser: async (token) => {
            return fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            }).then((response) => response.json());
        }
    };
};

export default GAuthApiService;