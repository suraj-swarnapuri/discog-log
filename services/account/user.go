package account

import "github.com/google/uuid"

type User struct {
	ID       string
	Email    string
	Password string
	Name     string
}

func NewUser(email, password, name string) User {
	return User{
		ID:       uuid.New().String(),
		Email:    email,
		Password: password,
		Name:     name,
	}
}
