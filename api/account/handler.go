package account

import (
	"encoding/json"
	"fmt"
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

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
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

	// Check if a cookie with the same name already exists
	existingCookie, err := r.Cookie("user_id")
	if err == nil {
		// Cookie exists, update its value
		existingCookie.Value = u.ID
		http.SetCookie(w, existingCookie)
	} else {
		// Cookie does not exist, create a new one
		newCookie := &http.Cookie{
			Name:     "user_id",
			Value:    u.ID,
			Path:     "/",
			HttpOnly: true,
		}
		http.SetCookie(w, newCookie)
	}

	w.WriteHeader(http.StatusOK)
}

func (h Handler) HandleUser(w http.ResponseWriter, r *http.Request) {
	// get user from cookie
	cookie, err := r.Cookie("user_id")
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	u, err := h.Service.GetUserByID(cookie.Value)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	// return user as json and set status 200
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(u)
}

func (h Handler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	// parse request body to loginRequest
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	u, err := h.Service.GetUserByEmail(req.Email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	fmt.Printf("user: %v\n", u)

	// Check if a cookie with the same name already exists
	existingCookie, err := r.Cookie("user_id")
	if err == nil {
		// Cookie exists, update its value
		existingCookie.Value = u.ID
		http.SetCookie(w, existingCookie)
	} else {
		// Cookie does not exist, create a new one
		newCookie := &http.Cookie{
			Name:     "user_id",
			Value:    u.ID,
			Path:     "/",
			HttpOnly: true,
		}
		http.SetCookie(w, newCookie)
	}

	w.WriteHeader(http.StatusOK)

}
