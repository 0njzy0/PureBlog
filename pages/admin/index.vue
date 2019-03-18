<template>
  <v-layout row wrap align-content-start>
    <v-flex xs6 md3>
      <v-card class="mx-auto text-xs-center" color="primary" dark>
        <v-card-text>
          <v-sheet color="primary darken-3">
            <div class="display-1 font-weight-medium">1</div>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <div class="display-1 font-weight-thin">用户</div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-center">
          <v-btn block flat>Go to Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs6 md3>
      <v-card class="mx-auto text-xs-center" color="primary" dark>
        <v-card-text>
          <v-sheet color="primary darken-3">
            <div class="display-1 font-weight-medium">12</div>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <div class="display-1 font-weight-thin">文章</div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-center">
          <v-btn block flat>Go to Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs6 md3>
      <v-card class="mx-auto text-xs-center" color="primary" dark>
        <v-card-text>
          <v-sheet color="primary darken-3">
            <div class="display-1 font-weight-medium">4</div>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <div class="display-1 font-weight-thin">类别</div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-center">
          <v-btn block flat>Go to Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs6 md3>
      <v-card class="mx-auto text-xs-center" color="primary" dark>
        <v-card-text>
          <v-sheet color="primary darken-3">
            <div class="display-1 font-weight-medium">5</div>
          </v-sheet>
        </v-card-text>
        <v-card-text>
          <div class="display-1 font-weight-thin">标签</div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-center">
          <v-btn block flat>Go to Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="mt-5 mx-auto">
        <v-sheet class="v-sheet--offset mx-auto" color="primary" elevation="12" max-width="calc(100% - 30px)">
          <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16" />
        </v-sheet>
        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">User Registrations</div>
          <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
          <v-divider class="my-2" />
          <v-icon class="mr-2" small>
            mdi-clock
          </v-icon>
          <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    labels: [],
    value: []
  }),
  mounted() {
    this.labels = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm']
    this.value = [200, 675, 410, 390, 310, 460, 250, 240]
  }
}
</script>

<style scoped>
.v-sheet--offset {
  position: relative;
  top: -24px;
}
</style>
