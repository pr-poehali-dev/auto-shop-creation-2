import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

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

  const Header = () => (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Wrench" size={32} className="text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Сто Деталей</h1>
              <p className="text-xs text-muted-foreground">Автозапчасти с гарантией</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'home' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setCurrentPage('catalog')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'catalog' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Каталог
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'about' ? 'text-primary' : 'text-foreground'
              }`}
            >
              О магазине
            </button>
            <button
              onClick={() => setCurrentPage('contacts')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'contacts' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Контакты
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p className="text-xs text-muted-foreground">{item.brand}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={12} />
                                </Button>
                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={12} />
                                </Button>
                                <span className="ml-auto font-bold text-primary">{item.price * item.quantity} ₽</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">Итого:</span>
                        <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );

  const HomePage = () => (
    <div>
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/aad30687-238f-432f-b597-3c08ac955a50/files/9ac5940c-6896-41ba-85d8-06501ec112ec.jpg"
            alt="Hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Качественные<br />
              <span className="text-primary">Автозапчасти</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Более 10 000 деталей для всех марок автомобилей. Гарантия качества и быстрая доставка.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => setCurrentPage('catalog')}>
                Перейти в каталог
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Популярные товары</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map(product => (
              <Card key={product.id} className="overflow-hidden hover:border-primary transition-colors group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary">{product.brand}</Badge>
                  </div>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Icon name="Shield" size={48} className="text-primary mb-4" />
                <CardTitle>Гарантия качества</CardTitle>
                <CardDescription>
                  Все запчасти сертифицированы и имеют официальную гарантию от производителя
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="Truck" size={48} className="text-primary mb-4" />
                <CardTitle>Быстрая доставка</CardTitle>
                <CardDescription>
                  Доставка по городу в день заказа, по России - от 2 дней
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="Headphones" size={48} className="text-primary mb-4" />
                <CardTitle>Консультация</CardTitle>
                <CardDescription>
                  Наши специалисты помогут подобрать нужные детали для вашего автомобиля
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );

  const CatalogPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Каталог запчастей</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="text-sm font-medium mb-2 block">Марка автомобиля</label>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите марку" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все марки</SelectItem>
                {brands.slice(1).map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Год выпуска</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите год" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все годы</SelectItem>
                {years.slice(1).map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Категория</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Badge variant="secondary">Найдено товаров: {filteredProducts.length}</Badge>
          {(selectedBrand !== 'all' || selectedYear !== 'all' || selectedCategory !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedBrand('all');
                setSelectedYear('all');
                setSelectedCategory('all');
              }}
            >
              <Icon name="X" size={16} className="mr-1" />
              Сбросить фильтры
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:border-primary transition-colors group">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-base">{product.name}</CardTitle>
                <CardDescription className="text-xs">
                  {product.brand} • {product.year}
                </CardDescription>
                <Badge variant="secondary" className="w-fit text-xs">{product.category}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                  <Button onClick={() => addToCart(product)} className="w-full">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-8">О магазине</h2>
        
        <div className="space-y-6 text-muted-foreground">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Сто Деталей - ваш надежный партнер</h3>
              <p className="mb-4">
                Мы работаем на рынке автозапчастей более 15 лет и знаем все о качественных деталях для вашего автомобиля.
                Наш магазин предлагает широкий ассортимент оригинальных и качественных неоригинальных запчастей для всех марок автомобилей.
              </p>
              <p>
                В нашем каталоге представлено более 10 000 наименований товаров от ведущих мировых производителей.
                Мы гарантируем подлинность всех деталей и предоставляем официальную гарантию.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Icon name="Award" size={40} className="text-primary mb-2" />
                <CardTitle>Наши преимущества</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Только сертифицированные запчасти</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Гарантия на все товары</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Профессиональная консультация</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary mt-0.5" />
                    <span>Конкурентные цены</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="MapPin" size={40} className="text-primary mb-2" />
                <CardTitle>География работы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Наша сеть магазинов охватывает все крупные города России. Мы осуществляем доставку в любую точку страны.
                </p>
                <p>
                  Работаем с частными клиентами, автосервисами и корпоративными заказчиками.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactsPage = () => (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-8">Контакты</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Icon name="Phone" size={40} className="text-primary mb-2" />
              <CardTitle>Телефон</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary mb-2">+7 (495) 100-20-30</p>
              <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Icon name="Mail" size={40} className="text-primary mb-2" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-medium text-primary mb-2">info@stodetaley.ru</p>
              <p className="text-muted-foreground">Ответим в течение часа</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Icon name="MapPin" size={40} className="text-primary mb-2" />
              <CardTitle>Адрес</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">г. Москва, ул. Автомобильная, д. 100</p>
              <p className="text-muted-foreground">Рядом с метро "Автозаводская"</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Icon name="Clock" size={40} className="text-primary mb-2" />
              <CardTitle>Режим работы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-1"><span className="font-medium">Пн-Пт:</span> 9:00 - 21:00</p>
              <p className="mb-1"><span className="font-medium">Сб-Вс:</span> 10:00 - 20:00</p>
              <p className="text-muted-foreground text-sm mt-2">Без перерывов и выходных</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Напишите нам</CardTitle>
            <CardDescription>Оставьте заявку и мы свяжемся с вами в ближайшее время</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Имя</label>
                <Input placeholder="Ваше имя" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Телефон</label>
                <Input placeholder="+7 (___) ___-__-__" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Сообщение</label>
                <Input placeholder="Опишите ваш вопрос" />
              </div>
              <Button className="w-full">Отправить заявку</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'catalog' && <CatalogPage />}
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
