package account

import (
	"encoding/json"
	"net/http"

	"github.com/suraj-swarnapuri/discogify/services/account"
)

type Handler struct {
	Service *account.Service
}

func NewHandler(service *account.Service) *Handler {
	return &Handler{Service: service}
}

type registerRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

func (r registerRequest) Validate() error {
	return nil
}

func (h Handler) HandleRegister(w http.ResponseWriter, r *http.Request) {
	// parse request body to registerRequest
	var req registerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// validate request
	if err := req.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	u, err := h.Service.Register(req.Email, req.Password, req.Name)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// return user as response and set status 200
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(u)
}
