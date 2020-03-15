<template>
  <v-app light>
    <v-content>
      <v-container>
        <v-row>
          <v-col xs="12" sm="12">
            <v-card>
              <v-card-title>0, 利用にあたって</v-card-title>
              <v-card-text>
                <p>本サービスでは利用者ご自身のCOTOHA APIの利用枠（1000回/日）でおじさん構文化しています。１文あたり4回ほど消費します。</p>
                <p>また、COTOHA APIではClient IDとClient secretを再発行することができますので、セキュリティの観点から本サービス利用後はそれらを再発行していただくようお願いいたたします</p>
                <p>実装している内容についてはQiita記事をご覧ください。</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="12">
            <v-card>
              <v-card-title>1, COTOHA APIに登録する</v-card-title>
              <v-card-text>
                <p><a href="https://api.ce-cotoha.com/contents/developers/index.html">for Developers 無料登録</a>からサインアップしてください。</p>
                <p>
                  ユーザー登録を済ませるとログイン画面が表示されるので、ログインして次のステップに移ってください。
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="12">
            <div class="">
              <v-card>
                <v-card-title>2, Access tokenを取得する</v-card-title>
                <v-card-text>
                  Client IDとClient secretをそれぞれ入力し、「Access tokenを取得」を押してください。
                  <v-text-field v-model="clientId" label="Client ID" :rules="clientIdInput" hide-details="auto"></v-text-field>
                  <v-text-field v-model="clientSecret" label="Client secret" :rules="clientSecretInput" hide-details="auto"></v-text-field>
                  <v-btn @click="getToken()" color="primary" :disabled="accessTokenBtn">Access tokenを取得</v-btn>
                  <v-progress-circular indeterminate="false" v-if="progressOfgetToken" color="primary"></v-progress-circular>{{tokenErrMsg}}{{tokenGetMsg}}
                </v-card-text>
                <v-card-subtitle>logic</v-card-subtitle>
                <v-card-text>COTOHA APIを利用するにはClient IDとClient secretを用いてAccess Tokenを取得する必要があります。このセクションでは入力されたClient IDとClient secretからAccess Tokenを自動で取得しています。この部分の詳細は公式ページをご覧ください。</v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="12">
            <div class="">
              <v-card>
                <v-card-title>3, おじさん構文にしたい文章を入力する。</v-card-title>
                <v-card-text>
                  おじさん構文にしたい普通の文章を入力してください。このとき、「ですます調」で入力してください。「崩した文章」だと正常に動作しません。
                  <v-text-field v-model="inputMsg" label="普通の文"></v-text-field>
                  <v-btn @click="compiler()" color="primary">おじさん構文化</v-btn>
                  <v-progress-circular indeterminate="false" v-if="progressOfgetOji" color="primary"></v-progress-circular>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="12">
            <div class="">
              <v-card>
                <v-card-title>4, 出力結果</v-card-title>
                <v-card-text>
                  変換には10秒程度かかりますが、長すぎる場合はエラーになっていることもあるので再押下したりリロードしたりしてください。
                  <v-text-field v-html="outputMsg" readonly :value="outputMsg"></v-text-field>
                  <!--<v-btn color="primary" :disable="tweetBtn" @click="writeToClipboard()">コピーしてつぶやく</v-btn>-->
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="12">
            <div class="">
              <v-card>
                <v-card-title>Logger</v-card-title>
                <v-card-text>
                  {{logMsg}}
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer><v-card-text class="text-center">&copy; flat35hd99</v-card-text></v-footer>
  </v-app>

</template>

<script>
import auth from './js/preparation'
import ojisanCompiler from './js/ojisan'

  export default {
    data: ()=> {
      return {
        clientIdInput: [
          value => !!value || 'Required.',
          //value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        clientSecretInput: [
          value => !!value || 'Required.',
          //value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        //section 2
        accessTokenBtn: false,
        tokenErrMsg: null,
        tokenGetMsg: null,
        clientId: null,
        clientSecret: null,
        accessToken: null,
        progressOfgetToken: false,
        //Section 3
        inputMsg: null,
        progressOfgetOji: false,
        //section 4
        outputMsg: null,
        //tweetBtn: false,
        //twitter
        //tweetUrl: "https://twitter.com",
        //以下はlog
        logMsg: '',
      }
    },
    methods: {
      async getToken(){
        if(this.clientId==null){
          this.tokenErrMsg = "Client IDを入力してください。"
        }else if(this.clientSecret==null){
          this.tokenErrMsg = "Client Secretを入力してください。"
        }else{
          this.tokenErrMsg = null
          this.progressOfgetToken = true
          try{
            const result = await auth(this.clientId,this.clientSecret)
            this.accessToken = result
            this.accessTokenBtn = true
            this.tokenGetMsg = "アクセストークンの取得に成功しました！"
            this.logMsg += 'Access Token : '+this.accessToken+'\n'
          }catch(e){
            this.tokenErrMsg = "Access Tokenの取得に失敗しました。入力に誤りがないか、または通信環境に問題ないか確認してください。"
          }finally{
            this.progressOfgetToken = false
          }
        }
      },
      async compiler(){
        try{
          this.progressOfgetOji = true
          const result = await ojisanCompiler(this.inputMsg,this.accessToken)
          this.outputMsg = result
          this.tweetBtn = true
          //this.getTweetUrl()
        }catch(e){
          this.ojiErrMsg = "おじさんになれませんでした。通信環境に問題ないか確認してください。症状が治らない場合はリロードするかブラウザを変更してください。"
        }finally{
          this.progressOfgetOji = false
        }
      },
      /*getTweetUrl () {
        const twitterUrl = "https://twitter.com/intent/tweet?"
        const hashTag = "おじさん構文"
        const sharedUrl = location.href
        this.tweetUrl = twitterUrl+"hashtags="+hashTag+"&url="+sharedUrl
      },*/

    }
  }
</script>
