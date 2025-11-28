import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface HomePageProps {
  products: Product[];
  setCurrentPage: (page: 'home' | 'catalog' | 'about' | 'contacts') => void;
  addToCart: (product: Product) => void;
}

export const HomePage = ({ products, setCurrentPage, addToCart }: HomePageProps) => (
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
