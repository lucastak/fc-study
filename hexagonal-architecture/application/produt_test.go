package application_test

import (
	"testing"

	"github.com/google/uuid"
	"github.com/lucastak/go-hexagonal/application"
	"github.com/stretchr/testify/require"
)

func TestProduct_Enable(t *testing.T) {
	product := application.Product{}
	product.Name = "Hello"
	product.Price = 10
	product.Status = application.DISABLED

	err := product.Enable()
	require.Nil(t, err)

	product.Price = 0
	err = product.Enable()
	require.Equal(t, err.Error(), "product price must be greater than zero to enable")
}

func TestProduct_Disable(t *testing.T) {
	product := application.Product{}
	product.Name = "Hello"
	product.Price = 0
	product.Status = application.ENABLED

	err := product.Disable()
	require.Nil(t, err)

	product.Price = 10
	err = product.Disable()
	require.Equal(t, err.Error(), "product price must be zero to disable")
}

func TestProduct_IsValid(t *testing.T) {
	product := application.Product{}
	product.Name = "Hello"
	product.Price = 10
	product.Status = application.ENABLED
	product.ID = uuid.New().String()

	ok, err := product.IsValid()
	require.Nil(t, err)
	require.True(t, ok)

	product.Price = -1
	ok, err = product.IsValid()
	require.Equal(t, err.Error(), "invalid price")
	require.False(t, ok)

	product.Price = 10
	product.ID = uuid.New().String()
	product.Status = "INVALID"
	ok, err = product.IsValid()
	require.Equal(t, err.Error(), "invalid status")
	require.False(t, ok)

	product.Price = 0
	product.Status = application.DISABLED
	ok, err = product.IsValid()
	require.Nil(t, err)
	require.True(t, ok)
}
