function onPaisSel(args) {
            var dados = args.itemData;

            $('#cod_pais').val(dados.codigo);
            $('#nome_pais').html(dados.nome);


        }

        function onChangeCob(args) {

            var resp = args.checked;
            console.log(resp);
            if (resp == true) {

                $('#cob_logradouro').val($('#com_logradouro').val());

                $('#cob_numero').val($('#com_numero').val());

                $('#cob_complemento').val($('#com_complemento').val());

                $('#cob_bairro').val($('#com_bairro').val());

                $('#cob_cidade').val($('#com_cidade').val());

                $('#cob_cep').val($('#com_cep').val());

                $('#cob_uf').val($('#com_uf').val());


            } else {
                console.log("entrou 2");
                $('#cob_logradouro').val("");
                $('#cob_numero').val("");
                $('#cob_complemento').val("");
                $('#cob_bairro').val("");
                $('#cob_cidade').val("");
                $('#cob_cep').val("");
                $('#cob_uf').val("");
            }

        }

        function onChangeEnt(args) {
            if (args.checked) {
                $('#ent_logradouro').val($('#com_logradouro').val());
                $('#ent_numero').val($('#com_numero').val());
                $('#ent_complemento').val($('#com_complemento').val());
                $('#ent_bairro').val($('#com_bairro').val());
                $('#ent_cidade').val($('#com_cidade').val());
                $('#ent_cep').val($('#com_cep').val());
                $('#ent_uf').val($('#com_uf').val());

            } else {
                $('#ent_logradouro').val("");
                $('#ent_numero').val("");
                $('#ent_complemento').val("");
                $('#ent_bairro').val("");
                $('#ent_cidade').val("");
                $('#ent_cep').val("");
                $('#ent_uf').val("");
            }

        }


        function onTransportadoraSel(args) {
            var dados = args.itemData;

            console.log(dados)
            $('#cod_transportadora').val(dados.codigo);


        }

        function onRepresentanteSel(args) {
            var dados = args.itemData;

            console.log(dados.cod_vendedor);
            $('#cod_vendedor').val(dados.cod_vendedor);


        }

        $(document).ready(function () {

            $("#cnpj").blur(function () {
                document.getElementById("loading").style.display = "block";
                // O CPF ou CNPJ
                var cpf_cnpj = $(this).val();


                // Testa a validação
                if (valida_cpf_cnpj(cpf_cnpj)) {

                    var ajax = new ej.base.Ajax('/Clientes/ValidaCNPJ?cnpj=' + cpf_cnpj, 'GET');
                    ajax.contentType = "application/json; charset=utf-8";

                    ajax.send();

                    ajax.onSuccess = function (data) {
                        console.log(data);
                        if (data == "true") {
                            alert('CPF ou CNPJ ' + cpf_cnpj + ' já cadastrado!');
                            $('#cnpj').val("");
                        }

                    };

                } else {

                    alert('CPF ou CNPJ inválido!');

                }
                document.getElementById("loading").style.display = "none";

            });

            $("#btnbuscacepcom").on("click", (function (e) {


                var ajax = new ej.base.Ajax('/Clientes/ConsultaCEP?cep=' + $('#com_cep').val(), 'GET');
                ajax.contentType = "application/json; charset=utf-8";
                //ajax.data = $('#com_cep').val();
                //alert(ajax.data);
                ajax.send();

                ajax.onSuccess = function (data) {
                    populate($.parseJSON(data), "com");
                    document.getElementById("loading").style.display = "none";
                };

                ajax.onFailure = function (data) {
                    alert("Atenção: CEP não localizado!");
                    document.getElementById("loading").style.display = "none";
                };

            }));

            $("#btnbuscacepcob").on("click", (function (e) {

                var ajax = new ej.base.Ajax('/Clientes/ConsultaCEP?cep=' + $('#cob_cep').val(), 'GET');
                ajax.contentType = "application/json; charset=utf-8";
                //ajax.data = $('#com_cep').val();
                //alert(ajax.data);
                ajax.send();

                ajax.onSuccess = function (data) {
                    populate($.parseJSON(data), "cob");
                    document.getElementById("loading").style.display = "none";
                };

                ajax.onFailure = function (data) {
                    alert("Atenção: CEP não localizado!");
                };
            }));

            $("#btnbuscacepent").on("click", (function (e) {

                var ajax = new ej.base.Ajax('/Clientes/ConsultaCEP?cep=' + $('#ent_cep').val(), 'GET');
                ajax.contentType = "application/json; charset=utf-8";
                //ajax.data = $('#com_cep').val();
                //alert(ajax.data);
                ajax.send();

                ajax.onSuccess = function (data) {
                    populate($.parseJSON(data), "ent");
                    document.getElementById("loading").style.display = "none";
                };

                ajax.onFailure = function (data) {
                    alert("Atenção: CEP não localizado!");
                };
            }));

            function populate(data, tipo) {
                $.each(data, function (key, value) {
                    $('[name=' + tipo + '_' + key + ']').val(value);
                });
            }

        });




        /*
verifica_cpf_cnpj

Verifica s
*/
        function verifica_cpf_cnpj(valor) {

            // Garante que o valor é uma string
            valor = valor.toString();

            // Remove caracteres inválidos do valor
            valor = valor.replace(/[^0-9]/g, '');

            // Verifica CPF
            if (valor.length === 11) {
                return 'CPF';
            }

            // Verifica CNPJ
            else if (valor.length === 14) {
                return 'CNPJ';
            }

            // Não retorna nada
            else {
                return false;
            }

        } // verifica_cpf_cnpj

        /*
         calc_digitos_posicoes

         Multiplica dígitos vezes posições

        */
        function calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {

            // Garante que o valor é uma string
            digitos = digitos.toString();

            // Faz a soma dos dígitos com a posição
            // Ex. para 10 posições:
            //   0    2    5    4    6    2    8    8   4
            // x10   x9   x8   x7   x6   x5   x4   x3  x2
            //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
            for (var i = 0; i < digitos.length; i++) {
                // Preenche a soma com o dígito vezes a posição
                soma_digitos = soma_digitos + (digitos[i] * posicoes);

                // Subtrai 1 da posição
                posicoes--;

                // Parte específica para CNPJ
                // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
                if (posicoes < 2) {
                    // Retorno a posição para 9
                    posicoes = 9;
                }
            }

            // Captura o resto da divisão entre soma_digitos dividido por 11
            // Ex.: 196 % 11 = 9
            soma_digitos = soma_digitos % 11;

            // Verifica se soma_digitos é menor que 2
            if (soma_digitos < 2) {
                // soma_digitos agora será zero
                soma_digitos = 0;
            } else {
                // Se for maior que 2, o resultado é 11 menos soma_digitos
                // Ex.: 11 - 9 = 2
                // Nosso dígito procurado é 2
                soma_digitos = 11 - soma_digitos;
            }

            // Concatena mais um dígito aos primeiro nove dígitos
            // Ex.: 025462884 + 2 = 0254628842
            var cpf = digitos + soma_digitos;

            // Retorna
            return cpf;

        } // calc_digitos_posicoes

        /*
         Valida CPF

         Valida se for CPF

        */
        function valida_cpf(valor) {

            // Garante que o valor é uma string
            valor = valor.toString();

            // Remove caracteres inválidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // Captura os 9 primeiros dígitos do CPF
            // Ex.: 02546288423 = 025462884
            var digitos = valor.substr(0, 9);

            // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
            var novo_cpf = calc_digitos_posicoes(digitos);

            // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
            var novo_cpf = calc_digitos_posicoes(novo_cpf, 11);

            // Verifica se o novo CPF gerado é idêntico ao CPF enviado
            if (novo_cpf === valor) {
                // CPF válido
                return true;
            } else {
                // CPF inválido
                return false;
            }

        } // valida_cpf

        /*
         valida_cnpj

         Valida se for um CNPJ

        */
        function valida_cnpj(valor) {

            // Garante que o valor é uma string
            valor = valor.toString();

            // Remove caracteres inválidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // O valor original
            var cnpj_original = valor;

            // Captura os primeiros 12 números do CNPJ
            var primeiros_numeros_cnpj = valor.substr(0, 12);

            // Faz o primeiro cálculo
            var primeiro_calculo = calc_digitos_posicoes(primeiros_numeros_cnpj, 5);

            // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
            var segundo_calculo = calc_digitos_posicoes(primeiro_calculo, 6);

            // Concatena o segundo dígito ao CNPJ
            var cnpj = segundo_calculo;

            // Verifica se o CNPJ gerado é idêntico ao enviado
            if (cnpj === cnpj_original) {
                return true;
            }

            // Retorna falso por padrão
            return false;

        } // valida_cnpj

        /*
         valida_cpf_cnpj

         Valida o CPF ou CNPJ

        */
        function valida_cpf_cnpj(valor) {

            // Verifica se é CPF ou CNPJ
            var valida = verifica_cpf_cnpj(valor);

            // Garante que o valor é uma string
            valor = valor.toString();

            // Remove caracteres inválidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // Valida CPF
            if (valida === 'CPF') {
                // Retorna true para cpf válido
                return valida_cpf(valor);
            }

            // Valida CNPJ
            else if (valida === 'CNPJ') {
                // Retorna true para CNPJ válido
                return valida_cnpj(valor);
            }

            // Não retorna nada
            else {
                return false;
            }

        } // valida_cpf_cnpj

        /*
         formata_cpf_cnpj

         Formata um CPF ou CNPJ

        */
        function formata_cpf_cnpj(valor) {

            // O valor formatado
            var formatado = false;

            // Verifica se é CPF ou CNPJ
            var valida = verifica_cpf_cnpj(valor);

            // Garante que o valor é uma string
            valor = valor.toString();

            // Remove caracteres inválidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // Valida CPF
            if (valida === 'CPF') {

                // Verifica se o CPF é válido
                if (valida_cpf(valor)) {

                    // Formata o CPF ###.###.###-##
                    formatado = valor.substr(0, 3) + '.';
                    formatado += valor.substr(3, 3) + '.';
                    formatado += valor.substr(6, 3) + '-';
                    formatado += valor.substr(9, 2) + '';

                }

            }

            // Valida CNPJ
            else if (valida === 'CNPJ') {

                // Verifica se o CNPJ é válido
                if (valida_cnpj(valor)) {

                    // Formata o CNPJ ##.###.###/####-##
                    formatado = valor.substr(0, 2) + '.';
                    formatado += valor.substr(2, 3) + '.';
                    formatado += valor.substr(5, 3) + '/';
                    formatado += valor.substr(8, 4) + '-';
                    formatado += valor.substr(12, 14) + '';

                }

            }

            // Retorna o valor
            return formatado;

        } // formata_cpf_cnpj
