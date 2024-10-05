package account

import (
	"errors"
	"fmt"
)

type Service struct {
	users []User
}

func NewService() *Service {
	return &Service{}
}

func (s *Service) Register(email, password, name string) (User, error) {
	user := NewUser(email, password, name)
	fmt.Println(user)
	s.users = append(s.users, user)
	return user, nil
}

func (s *Service) GetUserByID(id string) (User, error) {
	for _, user := range s.users {
		if user.ID == id {
			return user, nil
		}
	}
	return User{}, errors.New("user not found")
}

func (s *Service) GetUserByEmail(email string) (User, error) {
	for _, user := range s.users {
		if user.Email == email {
			return user, nil
		}
	}
	return User{}, errors.New("user not found")
}
