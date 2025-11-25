import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  
  {
    name: "Camisa Casual Oxford",
    price: 89,
    description:
      "Camisa de algodón 100% con corte clásico. Perfecta para ocasiones casuales y formales. Disponible en varios colores, confeccionada con materiales de alta calidad para máxima comodidad.",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop",
    categoryId: 1,
    stock: 15,
  },
  {
    name: "Jeans Slim Fit",
    price: 129,
    description:
      "Jeans de mezclilla premium con corte slim fit. Diseño moderno y versátil, ideal para el día a día. Fabricado con denim de alta calidad que se adapta perfectamente al cuerpo.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    categoryId: 1,
    stock: 20,
  },
  {
    name: "Chaqueta de Cuero",
    price: 299,
    description:
      "Chaqueta de cuero genuino con estilo biker. Diseño atemporal que nunca pasa de moda. Confeccionada con cuero de primera calidad, perfecta para darle un toque rebelde a tu look.",
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500&h=500&fit=crop",
    categoryId: 1,
    stock: 8,
  },
  {
    name: "Camiseta Premium",
    price: 45,
    description:
      "Camiseta de algodón orgánico con corte regular. Suave al tacto y duradera. Diseño minimalista perfecto para combinar con cualquier outfit, disponible en colores básicos.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    categoryId: 1,
    stock: 25,
  },

  
  {
    name: "Anillo de Acero Inoxidable",
    price: 49,
    description:
      "Anillo masculino de acero inoxidable con acabado mate. Resistente al agua y anti-alérgico. Diseño minimalista y elegante, perfecto para uso diario.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    categoryId: 2,
    stock: 12,
  },
  {
    name: "Collar Cadena Plateada",
    price: 79,
    description:
      "Collar de cadena en acero inoxidable plateado. Diseño clásico y versátil que complementa cualquier estilo. Cierre seguro y resistente, ideal para uso diario.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "Billetera de Cuero",
    price: 89,
    description:
      "Billetera de cuero genuino con múltiples compartimentos. Design elegante y funcional con espacio para tarjetas, billetes y documentos. Artesanía de calidad superior.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
    categoryId: 2,
    stock: 18,
  },

  
  {
    name: "Eau de Toilette Masculino",
    price: 89,
    description:
      "Fragancia fresca y sofisticada con notas de bergamota y cedro. Perfecta para el hombre moderno y elegante. Duración prolongada y aroma distintivo.",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop",
    categoryId: 3,
    stock: 14,
  },
  {
    name: "Traje Elegante",
    price: 65,
    description:
      "Traje elegante negro de alta gamma ideal para situaciones especiales.",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&h=500&fit=crop",
    categoryId: 3,
    stock: 16,
  },

  
  {
    name: "Sneakers Urbanos",
    price: 149,
    description:
      "Zapatillas urbanas con diseño moderno y cómodo. Suela antideslizante y materiales transpirables. Perfectas para el día a día con estilo casual-deportivo.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    categoryId: 4,
    stock: 22,
  },
  {
    name: "Zapatos Oxford",
    price: 199,
    description:
      "Zapatos clásicos Oxford de cuero genuino. Elegantes y versátiles, perfectos para ocasiones formales y semi-formales. Artesanía tradicional con acabados de lujo.",
    image:
      "https://images.unsplash.com/photo-1614253429340-98120bd6d753?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    categoryId: 4,
    stock: 11,
  },

  
  {
    name: "Reloj Deportivo Digital",
    price: 129,
    description:
      "Reloj deportivo con múltiples funciones: cronómetro, alarma, resistente al agua. Diseño moderno y robusto, perfecto para actividades deportivas y uso diario.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    categoryId: 5,
    stock: 9,
  },
  {
    name: "Reloj Clásico Analógico",
    price: 249,
    description:
      "Reloj elegante con esfera clásica y correa de cuero genuino. Movimiento de precisión y diseño atemporal. Ideal para ocasiones formales y uso ejecutivo.",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    categoryId: 5,
    stock: 7,
  },

  
  {
    name: "Gafas de Sol Aviador",
    price: 159,
    description:
      "Gafas de sol estilo aviador con lentes polarizadas. Protección UV400 y montura resistente. Diseño clásico que nunca pasa de moda, perfecto para cualquier ocasión.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    categoryId: 6,
    stock: 13,
  },
  {
    name: "Gafas Casual Modernas",
    price: 119,
    description:
      "Gafas de sol con diseño moderno y contemporáneo. Lentes anti-reflejo y montura ligera. Estilo urbano y sofisticado para el hombre actual.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
    categoryId: 6,
    stock: 15,
  },

  

  
  {
    name: "Traje Premium Ejecutivo",
    price: 899,
    description:
      "Traje de alta gama confeccionado con lana premium italiana. Corte impecable y acabados de lujo. La opción perfecta para el ejecutivo moderno que busca elegancia y distinción.",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
    categoryId: 1,
    stock: 5,
  },
  {
    name: "Reloj Premium Swiss",
    price: 1299,
    description:
      "Reloj suizo de lujo con movimiento automático. Caja de acero inoxidable premium y cristal de zafiro. Una pieza excepcional para el hombre que aprecia la calidad premium.",
    image:
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=500&h=500&fit=crop",
    categoryId: 2,
    stock: 3,
  },
  {
    name: "Fragancia Premium Noir",
    price: 189,
    description:
      "Eau de parfum premium con notas de oud y especias orientales. Una fragancia sofisticada y exclusiva para el hombre que busca distinción y elegancia premium.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
    categoryId: 3,
    stock: 8,
  },

  
  {
    name: "Camisa Casual - Oferta Especial",
    price: 45,
    description:
      "Camisa de algodón en oferta limitada. Calidad excepcional a precio reducido. Aprovecha esta oferta especial para renovar tu guardarropa con estilo.",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    categoryId: 1,
    stock: 20,
  },
  {
    name: "Pulsera Deportiva - Oferta",
    price: 25,
    description:
      "Pulsera deportiva de silicona en oferta por tiempo limitado. Resistente al agua y cómoda para uso diario. Una gran oferta que no puedes dejar pasar.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop",
    categoryId: 2,
    stock: 30,
  },

  
  {
    name: "Sudadera Nuevo Diseño",
    price: 79,
    description:
      "Nueva sudadera con capucha y diseño moderno. Tejido de algodón orgánico y corte contemporáneo. Parte de nuestra nueva colección de ropa casual urbana.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    categoryId: 1,
    stock: 15,
  },
  {
    name: "Gorra Nueva Colección",
    price: 35,
    description:
      "Nueva gorra snapback con bordado exclusivo. Diseño fresco y juvenil, perfecta para complementar tu look casual. Nuevo modelo recién llegado.",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&h=500&fit=crop",
    categoryId: 2,
    stock: 25,
  },
  {
    name: "Colonia Nuevo Aroma",
    price: 65,
    description:
      "Nueva fragancia con aroma fresco y cítrico. Perfecto para el día a día, con una combinación única de notas que acaba de llegar a nuestra nueva colección.",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&h=500&fit=crop",
    categoryId: 3,
    stock: 18,
  },

  
  {
    name: "Bomber Jacket Tendencia",
    price: 159,
    description:
      "Chaqueta bomber que marca tendencia esta temporada. Diseño urbano y moderno que está en todas las pasarelas. La prenda que define la tendencia actual.",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop",
    categoryId: 1,
    stock: 12,
  },
  {
    name: "Cadena Tendencia Street",
    price: 89,
    description:
      "Cadena de acero con diseño que marca tendencia en el street style. Estilo urbano que está en tendencia entre los jóvenes. Accesorio imprescindible de la temporada.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    categoryId: 2,
    stock: 20,
  },
  {
    name: "Perfume Tendencia Moderna",
    price: 125,
    description:
      "Fragancia que está marcando tendencia entre los hombres modernos. Aroma innovador que combina notas clásicas con toques contemporáneos. La tendencia olfativa del momento.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=500&fit=crop",
    categoryId: 3,
    stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
