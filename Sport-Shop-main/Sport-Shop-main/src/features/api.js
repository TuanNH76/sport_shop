export const url = "http://localhost:8080/api";

export const setHeaders = () => {
    const headers = {
      headers: {
        "authorization": localStorage.getItem("token"),
      },
    };
    
    return headers;
  };