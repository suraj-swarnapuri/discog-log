package discog

import (
	"context"
	"errors"
)

type Service struct {
	clients map[string]*Client
	ctx     context.Context
}

func NewService(ctx context.Context) *Service {
	return &Service{
		clients: make(map[string]*Client),
		ctx:     ctx,
	}
}

func (s *Service) Register(uuid string) error {
	client, err := New(s.ctx)
	if err != nil {
		return err
	}

	s.clients[uuid] = client
	return nil
}

func (s *Service) GetClient(uuid string) (*Client, error) {
	client, ok := s.clients[uuid]
	if !ok {
		return nil, errors.New("client not found")
	}

	return client, nil
}
