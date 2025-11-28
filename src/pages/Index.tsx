import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Header } from '@/components/Header';
import { HomePage } from '@/components/HomePage';
import { CatalogPage } from '@/components/CatalogPage';
import { AboutPage, ContactsPage } from '@/components/AboutContactsPages';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  year: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

function Index() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'about' | 'contacts'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products: Product[] = [
    { id: 1, name: 'Тормозные колодки Premium', price: 3500, category: 'Тормозная система', brand: 'Toyota', year: '2018-2023', image: 'https://cdn.poehali.dev/projects/aad30687-238f-432f-b597-3c08ac955a50/files/6edb90fa-f3d6-46d8-9b08-1c7fe7d67322.jpg' },
    { id: 2, name: 'Масляный фильтр', price: 850, category: 'Двигатель', brand: 'BMW', year: '2015-2022', image: 'https://cdn.poehali.dev/projects/aad30687-238f-432f-b597-3c08ac955a50/files/6edb90fa-f3d6-46d8-9b08-1c7fe7d67322.jpg' },
    { id: 3, name: 'Свечи зажигания (комплект)', price: 2400, category: 'Двигатель', brand: 'Mercedes', year: '2016-2023', image: 'https://cdn.poehali.dev/projects/aad30687-238f-432f-b597-3c08ac955a50/files/6edb90fa-f3d6-46d8-9b08-1c7fe7d67322.jpg' },
    { id: 4, name: 'Воздушный фильтр', price: 1200, category: 'Двигатель', brand: 'Audi', year: '2017-2023', image: 'https://cdn.poehali.dev/projects/aad30687-238f-432f-b597-3c08ac955a50/files/6edb90fa-f3d6-46d8-9b08-1c7fe7d67322.jpg' },
    { id: 5, name: 'Амортизаторы передние', price: 8900, category: 'Подвеска', brand: 'Toyota', year: '2015-2022', image: 'https://cdn.poehali.dev/projects/aad30687-238f-432f-b597-3c08ac955a50/files/6edb90fa-f3d6-46d8-9b08-1c7fe7d67322.jpg' },
    { id: 6, name: 'Тормозные диски (пара)', price: 6500, category: 'Тормозная система', brand: 'BMW', year: '2016-2023', image: 'https://cdn.poehali.dev/projects/aad30687-238f-432f-b597-3c08ac955a50/files/6edb90fa-f3d6-46d8-9b08-1c7fe7d67322.jpg' },
  ];

  const brands = ['all', 'Toyota', 'BMW', 'Mercedes', 'Audi'];
  const years = ['all', '2015-2022', '2016-2023', '2017-2023', '2018-2023'];
  const categories = ['all', 'Двигатель', 'Тормозная система', 'Подвеска'];

  const filteredProducts = products.filter(product => {
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
    if (selectedYear !== 'all' && product.year !== selectedYear) return false;
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    return true;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        updateQuantity={updateQuantity}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
      <main>
        {currentPage === 'home' && (
          <HomePage 
            products={products}
            setCurrentPage={setCurrentPage}
            addToCart={addToCart}
          />
        )}
        {currentPage === 'catalog' && (
          <CatalogPage 
            filteredProducts={filteredProducts}
            brands={brands}
            years={years}
            categories={categories}
            selectedBrand={selectedBrand}
            selectedYear={selectedYear}
            selectedCategory={selectedCategory}
            setSelectedBrand={setSelectedBrand}
            setSelectedYear={setSelectedYear}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
          />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contacts' && <ContactsPage />}
      </main>
      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" size={24} className="text-primary" />
              <span className="font-bold">Сто Деталей</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Сто Деталей. Все права защищены.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
