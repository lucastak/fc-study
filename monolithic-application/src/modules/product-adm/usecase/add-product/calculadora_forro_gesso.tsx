import { invoke } from "$store/runtime.ts";
import { ProductResponse } from "$store/loaders/product/legacy/getProductInfoById.ts";
import { DataProduct } from "$store/components/product/Calculators/types/types.ts";

export interface PropsData {
  id_chapa: { name: string; value: string };
  area: { name: string; value: string };
  perimetro: { name: string; value: string };
  vao_forro_teto: { name: string; value: string };
}

interface InitialProduct {
  productId: string;
  productName: string;
  medida: string;
  exibe: boolean;
  observacao: string;
  quant_por_m2: number | null;
  quant_por_m_linear: number | null;
  total: number;
}

export class ForroGessoCalculationService {
  private data: PropsData;
  private initialProducts: InitialProduct[];
  public dataProducts: DataProduct[];
  private optionsGet: RequestInit;
  public produtos: {
    id: string;
    index: number;
    quantity: number;
    seller: string;
    // deno-lint-ignore no-explicit-any
    options: any[];
  }[];

  constructor(data: PropsData) {
    this.data = data;
    this.initialProducts = [];
    this.dataProducts = [];
    this.produtos = [];

    this.optionsGet = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    this.calculateValues();
  }

  private calculateValues() {
    const input = {
      id_chapa: this.data.id_chapa.value,
      area: parseInt(this.data.area.value),
      perimetro: parseInt(this.data.perimetro.value),
      vao_forro_teto: parseFloat(this.data.vao_forro_teto.value) / 100,
    };

    const tipoPlacaPorProductId: Record<string, string> = {
      "24": "ST",
      "25": "RU",
      "64": "RF",
    };

    if (!(input.id_chapa in tipoPlacaPorProductId))
      throw new Error("Placa não encontrada!");

    const coeficiente_perda = 1.05;
    const tipo_placa = tipoPlacaPorProductId[input.id_chapa];
    const tabicas_por_m_linear = 1 / 3;
    let quantidade_tabica =
      coeficiente_perda * input.perimetro * tabicas_por_m_linear;
    let quantidade_pendural =
      coeficiente_perda * input.area * (tipo_placa == "ST" ? 1.52 : 2.03);
    let parafusos_por_m2 =
      (quantidade_pendural + 5 * quantidade_tabica) / input.area;

    let listaProdutos: InitialProduct[] = [
      {
        productId: input.id_chapa,
        productName: "Placa de Gesso Drywall 12,5 X 1200 X 1800mm",
        medida: "Unidade",
        quant_por_m2: 0.47,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao: "Placa de gesso usada para o fechamento do forro.",
      },
      {
        productId: "392",
        productName: "Tabica Branca 3000 Z275",
        medida: "Unidade",
        quant_por_m2: null,
        quant_por_m_linear: 1 / 3,
        total: 0,
        exibe: true,
        observacao:
          "Acabamento perimetral que cria um recuo estético entre forro e parede.",
      },
      {
        productId: "379",
        productName: "Perfil para Forro de Drywall Canaleta F530 3M",
        medida: "Unidade",
        quant_por_m2: tipo_placa == "ST" ? 0.66 : 0.88,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao:
          "Perfil principal que sustenta as placas de gesso no forro.",
      },
      {
        productId: "383",
        productName: "Pendural Regulador F530 Z275",
        medida: "Unidade",
        quant_por_m2: tipo_placa == "ST" ? 1.52 : 2.03,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao: "Usado para suspender e nivelar os perfis F530 no teto.",
      },
      {
        productId: "382",
        productName: "Emenda para Perfil F530",
        medida: "Unidade",
        quant_por_m2: tipo_placa == "ST" ? 0.33 : 0.44,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao:
          "Conecta dois perfis F530, garantindo continuidade estrutural.",
      },
      {
        productId: "395",
        productName: "Arame Galvanizado Nº10",
        medida: "KG",
        quant_por_m2:
          (input.vao_forro_teto * (tipo_placa == "ST" ? 1.52 : 2.03)) / 12,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao:
          "Utilizado para fixar os pendurais na estrutura superior do ambiente.",
      },
      {
        productId: "1220",
        productName:
          "Smart Parafuso GN25 3,5x25mm Trombeta Fosfatizado - Pacote com 100 Unidades",
        medida: "Pacote",
        quant_por_m2: 16.45 / 100,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao: "Parafuso para fixação das placas de gesso nos perfis.",
      },
      {
        productId: "1346",
        productName:
          "Smart Parafuso 4,2 x 13MM Flangeado Cromado Ponta Agulha Pacote com 100 Unidades",
        medida: "Pacote",
        quant_por_m2: (tipo_placa == "ST" ? 5.28 : 7.04) / 100,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao: "Parafuso para fixação dos perfis metálicos entre si.",
      },
      {
        productId: "1225",
        productName:
          "Smart Fita Papel Perfurada Para Junta De Drywall 150.000 mm",
        medida: "Rolo",
        quant_por_m2: 1.66 / 150,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao: "Usada no tratamento de juntas entre placas de gesso.",
      },
      {
        productId: "1219",
        productName: "Smart Massa Para Junta de Drywall 25KG",
        medida: "Balde",
        quant_por_m2: 0.5 / 25,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao:
          "Utilizada para acabamento e tratamento das juntas das placas.",
      },
      {
        productId: "407",
        productName:
          "Parafuso Chip 5.0 x 40 MM Ponta Agulha Pacote com 100 Unidades",
        medida: "Pacote",
        quant_por_m2: parafusos_por_m2 / 100,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao:
          "Parafuso para fixar os pendurais na estrutura da laje e as tabicas na parede.",
      },
      {
        productId: "408",
        productName: "Bucha Plástica C/ Anel Nº6 pacote com 100 unidades",
        medida: "Pacote",
        quant_por_m2: parafusos_por_m2 / 100,
        quant_por_m_linear: null,
        total: 0,
        exibe: true,
        observacao:
          "Auxilia na fixação dos parafusos na estrutura da laje e das paredes.",
      },
    ];

    listaProdutos = listaProdutos.map((produto) => {
      let total =
        (produto.quant_por_m2 ?? 0) * input.area +
        (produto.quant_por_m_linear ?? 0) * input.perimetro;
      total = Math.ceil(total * coeficiente_perda);
      produto.total = total;
      return produto;
    });

    this.initialProducts = listaProdutos.filter((produto) => produto.total > 0);
  }

  public async fetchDataProducts() {
    try {
      const productPromises = this.initialProducts.map(async (item) => {
        try {
          const productId = item.productId;
          const response: ProductResponse = await invoke[
            "site"
          ].loaders.product.legacy.getProductInfoById({ productId });

          if (item.exibe) {
            const bestPrice = response.skus[0]?.bestPrice;
            const total = item.total;

            return {
              productInfos: response,
              medida: item.medida,
              totalPrice: bestPrice * total,
              quantity: total,
              isSelected: true,
            };
          }
        } catch (err) {
          console.error(err);
        }
      });

      const productsData = await Promise.all(productPromises);

      this.dataProducts = productsData.filter(
        (product): product is DataProduct =>
          product !== null && product !== undefined
      );
    } catch (err) {
      console.error(err);
    }
  }
}
