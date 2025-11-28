import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export const AboutPage = () => (
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

export const ContactsPage = () => (
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
