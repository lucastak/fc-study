package entity

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type Client struct {
	ID        string
	Name      string
	Email     string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewClient(name string, email string) (*Client, error) {
	client := &Client{
		ID:        uuid.New().String(),
		Name:      name,
		Email:     email,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := Validate(client)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func Validate(client *Client) error {
	if client.Name == "" {
		return errors.New("name is required")
	}
	if client.Email == "" {
		return errors.New("email is required")
	}

	return nil
}

func (c *Client) Update(name, email string) error {
	c.Name = name
	c.Email = email
	c.UpdatedAt = time.Now()

	err := Validate(c)
	if err != nil {
		return err
	}
	return nil
}
