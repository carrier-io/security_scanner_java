const javaIntegration = {
    delimiters: ['[[', ']]'],
    props: ['instance_name', 'section', 'selected_integration', 'is_selected', 'integration_data'],
    emits: ['set_data', 'clear_data'],
    data() {
        return this.initialState()
    },
    computed: {
        body_data() {
            const {
                description,
                is_default,
                selected_integration: id,
                save_intermediates_to,
                composition_analysis,
                artifact_analysis,
                scan_path,
                scan_opts,
                timeout,
                timeout_threshold,
            } = this
            return {
                description,
                is_default,
                id,
                save_intermediates_to,
                composition_analysis,
                artifact_analysis,
                scan_path,
                scan_opts,
                timeout,
                timeout_threshold,

            }
        },
    },
    watch: {
        selected_integration(newState, oldState) {
            console.debug('watching selected_integration: ', oldState, '->', newState, this.integration_data)
            this.set_data(this.integration_data?.settings, false)
        }
    },
    methods: {
        get_data() {
            if (this.is_selected) {
                return this.body_data
            }
        },
        set_data(data, emit = true) {
            Object.assign(this.$data, data)
            emit&& this.$emit('set_data', data)
        },
        clear_data() {
            Object.assign(this.$data, this.initialState())
            this.$emit('clear_data')
        },

        handleError(response) {
            try {
                response.json().then(
                    errorData => {
                        errorData.forEach(item => {
                            console.debug('java item error', item)
                            this.error = {[item.loc[0]]: item.msg}
                        })
                    }
                )
            } catch (e) {
                alertCreateTest.add(e, 'danger-overlay')
            }
        },

        initialState: () => ({
            // toggle: false,
            error: {},
            save_intermediates_to: '/data/intermediates/sast',
            composition_analysis: false,
            artifact_analysis: false,
            scan_path: '/tmp/code',
            scan_opts: "",
            timeout: 15,
            timeout_threshold: 5,
        })
    },
    template: `
        <div class="mt-3">
            <div class="row">
                <div class="col">
                    <h7>Advanced Settings</h7>
                    <p>
                        <h13>Integration default settings can be overridden here</h13>
                    </p>
                </div>
            </div>
            <div class="form-group">
            <form autocomplete="off">
                <div class="form-group">
                    <h9>Scan Types</h9>
                    <div class="row p-2 pl-4">
                        <div class="col">
                            <label class="custom-checkbox align-items-center mr-3">
                                <input type="checkbox" v-model="composition_analysis">
                                <h9 class="ml-1">
                                    Composition analysis
                                </h9>
                            </label>
                        </div>
                        <div class="col">
                            <label class="custom-checkbox align-items-center mr-3">
                                <input type="checkbox" v-model="artifact_analysis">
                                <h9 class="ml-1">
                                    Artifact analysis
                                </h9>
                            </label>
                        </div>
                    </div>
                </div>
    
                <h9>Save intermediates to</h9>
                <p>
                    <h13>Optional</h13>
                </p>
                <input type="text" class="form-control form-control-alternative"
                    placeholder=""
                    v-model="save_intermediates_to"
                    :class="{ 'is-invalid': error.save_intermediates_to }">
                <div class="invalid-feedback">[[ error.save_intermediates_to ]]</div>

                <div class="form-group form-row">
                <div class="col-6">
                    <h9>Timeout threshold</h9>
                    <p>
                        <h13>Optional</h13>
                    </p>
                    <input type="number" class="form-control form-control-alternative"
                        placeholder=""
                        v-model="timeout_threshold"
                        :class="{ 'is-invalid': error.timeout_threshold }"
                        >
                        <div class="invalid-feedback">[[ error.timeout_threshold ]]</div>
                    </div>
                    <div class="col-6">
                        <h9>Timeout</h9>
                        <p>
                            <h13>Optional</h13>
                        </p>
                        <input type="number" class="form-control form-control-alternative"
                            placeholder=""
                            v-model="timeout"
                            :class="{ 'is-invalid': error.timeout }"
                        >
                        <div class="invalid-feedback">[[ error.timeout ]]</div>
                        </div>
                    </div>

                    <h9>Additional options</h9>
                    <p>
                        <h13>Optional</h13>
                    </p>
                    <input type="text" class="form-control form-control-alternative"
                        placeholder="additional options"
                        v-model="scan_opts"
                        :class="{ 'is-invalid': error.scan_opts }">
                    <div class="invalid-feedback">[[ error.scan_opts ]]</div>

                    <h9>Path to code for analysis</h9>
                    <p>
                        <h13>Optional</h13>
                    </p>
                    <input type="text" class="form-control form-control-alternative"
                        placeholder=""
                        v-model="scan_path"
                        :class="{ 'is-invalid': error.scan_path }">
                    <div class="invalid-feedback">[[ error.scan_path ]]</div>
            
            </form>
            </div>
        </div>
    `
}


register_component('scanner-java', javaIntegration)

