import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface HeaderProps {
  currentPage: 'home' | 'catalog' | 'about' | 'contacts';
  setCurrentPage: (page: 'home' | 'catalog' | 'about' | 'contacts') => void;
  cart: CartItem[];
  updateQuantity: (productId: number, newQuantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

export const Header = ({ currentPage, setCurrentPage, cart, updateQuantity, totalItems, totalPrice }: HeaderProps) => (
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
