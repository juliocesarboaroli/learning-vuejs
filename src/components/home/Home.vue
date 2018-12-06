<template>
  <div>
    <h1 class="centralizado">Alurapic</h1>
    <input type="search" v-on:input="filtro= $event.target.value" class="filtro" placeholder="Filtre pelo título da imagem">
    {{filtro}}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :src="foto.url" :alt="foto.titulo" v-meu-transform:scale.animate="1.2"/>

          <!-- @click.native, pois a diretiva só conhece o que ela disponibiliza -->
          <!-- Esta opção faz com que o evento click nativo de qualquer tag seja disparado -->
          <meu-botao 
                  rotulo="Remover" 
                  tipo="button" 
                  :confirmacao="true"
                  estilo="perigo"
                  @botaoAtivado="remove(foto)"/>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";

import transform from '../../directives/Transform';

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  methods: {
    remove(foto) {
      alert(foto.titulo);
    }
  },

  directives: {
    'meu-transform': transform
  },

  data() {
    return {
      fotos: [],
      filtro: ""
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let regex = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(f => regex.test(f.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  // The created lifecycle hook
  created() {
    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then(res => res.json())
      .then(fotos => (this.fotos = fotos), err => console.log(err));
  }
};
</script>

<style>
.filtro {
  display: block;
  width: 100%;
}

.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}
</style>
