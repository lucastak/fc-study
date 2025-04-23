package application_test

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/lucastak/go-hexagonal/application"
	mock_application "github.com/lucastak/go-hexagonal/application/mocks"
	"github.com/stretchr/testify/require"
)

func TestProductService_Get(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	persistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Get("123")
	require.Nil(t, err)
	require.Equal(t, product, result)
}

func TestProducrService_Create(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Create("Hello", 10)
	require.Nil(t, err)
	require.Equal(t, product, result)
}

func TestProductService_EnabledDisabled(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	product := mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Enable().Return(nil).AnyTimes()
	product.EXPECT().Disable().Return(nil).AnyTimes()

	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(product, nil).AnyTimes()
	service := application.ProductService{Persistence: persistence}

	result, err := service.Enabled(product)
	require.Nil(t, err)
	require.Equal(t, product, result)

	result, err = service.Disabled(product)
	require.Nil(t, err)
	require.Equal(t, product, result)

}
