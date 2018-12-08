<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <h2 class="centralizado" v-if="foto._id">Alteração</h2>
    <h2 class="centralizado" v-else>Inclusão</h2>

    <!-- v-model faz o two way data binding -->
    <!-- por isso, não é preciso fazer as duas associações manualmente -->
    <!-- :value="foto.titulo" @input="foto.titulo = $event.target.value" -->
    <!-- v-model.lazy posterga a aplicação do v-model para o campo, ou seja, somente quando sair do campo é que os valores serão aplicados -->
    <form @submit.prevent="gravar()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          data-vv-as="título"
          name="titulo"
          v-validate
          data-vv-rules="required|min:3|max:30"
          v-model="foto.titulo"
          id="titulo"
          autocomplete="off"
        >
        <span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          name="url"
          v-validate
          data-vv-rules="required"
          v-model.lazy="foto.url"
          id="url"
          autocomplete="off"
        >
        <span class="erro" v-show="errors.has('url')">{{ errors.first('url') }}</span>
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea v-model="foto.descricao" id="descricao" autocomplete="off"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{name: 'home'}">
          <meu-botao rotulo="VOLTAR" tipo="button"/>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import FotoService from "../../domain/foto/FotoService";

import Foto from "../../domain/foto/Foto";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  methods: {
    gravar() {
      //$validator existe por conta do vee-validate
      this.$validator.validateAll().then(success => {
        if (!success) {
          return;
        }

        this.service.cadastra(this.foto).then(
          () => {
            if (this.id) this.$router.push({ name: "home" });
            this.foto = new Foto();
          },
          err => console.log(err)
        );
      });
    }
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id
    };
  },

  created() {
    //$resource foi feito para consumir API's no padrão REST
    //Caso o backend não use o padrão REST, $http é o objeto mais indicado para requests
    this.service = new FotoService(this.$resource);

    if (this.id) {
      this.service.buscaPorId(this.id).then(foto => (this.foto = foto));
    }
  }
};
</script>

<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}

.erro {
  color: red;
}
</style>

