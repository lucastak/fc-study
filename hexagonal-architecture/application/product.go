package application

type ProductInterface interface {
	IsValid() (bool, error)
	Enable() error
	Disable() error
	GetID() string
	GetName() string
	GetStatus() string
	GetPrice() float64
}

const (
	ENABLED  = "enabled"
	DISABLED= "disabled"
) 

type Product struct {
	ID    string
	Name  string
	Status string
	Price float64
}

func (p *Product) IsValid() (bool, error) {
	if p.ID == "" || p.Name == "" || p.Price <= 0 {
		return false, nil
	}
	return true, nil
}

func (p *Product) Enable() error {
	if p.Status == ENABLED {
		return nil
	}
	p.Status = ENABLED
	return nil
}

func (p *Product) Disable() error {
	if p.Status == DISABLED {
		return nil
	}
	p.Status = DISABLED
	return nil
}

func (p *Product) GetID() string {
	return p.ID
}

func (p *Product) GetName() string {
	return p.Name
}

func (p *Product) GetStatus() string {
	return p.Status
}

func (p *Product) GetPrice() float64 {
	return p.Price
}