package discog

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/suraj-swarnapuri/discogify/services/discog"
)

type Handler struct {
	service *discog.Service
}

func NewHandler(service *discog.Service) *Handler {
	return &Handler{
		service: service,
	}
}

// Will create a discog client for a user
func (h *Handler) HandleRegister(w http.ResponseWriter, r *http.Request) {
	fmt.Println("registering user")
	existingCookie, err := r.Cookie("user_id")
	if err != nil {
		fmt.Println("error getting cookie")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if existingCookie == nil {
		http.Error(w, "no user logged in", http.StatusUnauthorized)
		return
	}

	fmt.Println(existingCookie)

	err = h.service.Register(existingCookie.Value)
	if err != nil {
		fmt.Println("error registering user")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

}

func (h *Handler) Authenticate(w http.ResponseWriter, r *http.Request) {
	fmt.Println("auth user")
	existingCookie, err := r.Cookie("user_id")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if existingCookie == nil {
		http.Error(w, "no user logged in", http.StatusUnauthorized)
		return
	}

	client, err := h.service.GetClient(existingCookie.Value)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	url, err := client.Authenticate(r.Context())

	w.WriteHeader(http.StatusOK)
	// write url to json response
	json.NewEncoder(w).Encode(map[string]string{"url": url})

}
