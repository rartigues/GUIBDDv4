import http from "../http-common";

class ApiService {
    create(data) {
        return http.post("/users", data);
    }

    getEmpleados() {
        return http.get("/users");
    }

    getEmpleado(rut) {
        return http.get(`/users/${rut}`);
    }

    delEmpleado(rut) {
        return http.delete(`/users/${rut}`);
    }

    getContrato(rut) {
        return http.get(`/contrato/${rut}`);
    }
    getAllContratos() {
        return http.get("/contrato");
    }

    // Conseguir estado

}

export default new ApiService();