package application_test

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/lucastak/go-hexagonal/application"
	mock_application "github.com/lucastak/go-hexagonal/application/mocks"
	"github.com/stretchr/testify/require"
)

func setup(t *testing.T) (*gomock.Controller, *mock_application.MockProductPersistenceInterface, *application.ProductService) {
	ctrl := gomock.NewController(t)
	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	service := &application.ProductService{
		Persistence: persistence,
	}
	return ctrl, persistence, service
}

func TestProductService_Get(t *testing.T) {
	ctrl, persistence, service := setup(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	persistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()

	result, err := service.Get("123")
	require.Nil(t, err)
	require.Equal(t, product, result)
}

func TestProductService_Create(t *testing.T) {
	ctrl, persistence, service := setup(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(product, nil).AnyTimes()

	result, err := service.Create("Hello", 10)
	require.Nil(t, err)
	require.Equal(t, product, result)
}

func TestProductService_EnabledDisabled(t *testing.T) {
	ctrl, persistence, service := setup(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Enable().Return(nil).AnyTimes()
	product.EXPECT().Disable().Return(nil).AnyTimes()

	persistence.EXPECT().Save(gomock.Any()).Return(product, nil).AnyTimes()

	// Test Enabled
	result, err := service.Enabled(product)
	require.Nil(t, err)
	require.Equal(t, product, result)

	// Test Disabled
	result, err = service.Disabled(product)
	require.Nil(t, err)
	require.Equal(t, product, result)
}
