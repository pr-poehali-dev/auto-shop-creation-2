import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface CatalogPageProps {
  filteredProducts: Product[];
  brands: string[];
  years: string[];
  categories: string[];
  selectedBrand: string;
  selectedYear: string;
  selectedCategory: string;
  setSelectedBrand: (brand: string) => void;
  setSelectedYear: (year: string) => void;
  setSelectedCategory: (category: string) => void;
  addToCart: (product: Product) => void;
}

export const CatalogPage = ({
  filteredProducts,
  brands,
  years,
  categories,
  selectedBrand,
  selectedYear,
  selectedCategory,
  setSelectedBrand,
  setSelectedYear,
  setSelectedCategory,
  addToCart
}: CatalogPageProps) => (
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
