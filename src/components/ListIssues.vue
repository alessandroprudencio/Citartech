<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Criar nova Issue</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn type="submit" dark flat @click="dialog = false">Criar</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-list three-line subheader>

            <v-subheader></v-subheader>
            <v-list-tile>
                <v-flex xs12>
                    <v-text-field label="Nome da Issue" required></v-text-field>
                </v-flex>
            </v-list-tile>

            <v-list-tile>
                <v-flex xs12>
                    <v-text-field label="Descrição da Issue"></v-text-field>
                </v-flex>
            </v-list-tile>
            <br>
            <br>

            <v-list-tile>
                <v-flex xs1 v-for="input in inputs" :key="input.id">
                    <v-text-field v-model="input.label" :label="input == 1 ? 'Label 0' : input.label">

                    </v-text-field>
                    <!-- <v-btn fab dark small color="red">
                      <v-icon @click="removeRow(input)"  dark>remove</v-icon>
                    </v-btn> -->
                </v-flex>
                <v-btn fab dark small color="blue">
                    <v-icon @click="addRow()" dark>add</v-icon>
                </v-btn>
            </v-list-tile>

        </v-list>

    </v-card>
</template>
<script>
    export default {
        data() {
                return {
                    labels: [],
                    inputs: [1],
                }
            },
            methods: {
                addRow() {
                    this.inputs.push({
                        label: 'Label ' + this.inputs.length,
                    })
                },
            }
    }
</script>