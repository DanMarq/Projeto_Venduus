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


                // Testa a valida????o
                if (valida_cpf_cnpj(cpf_cnpj)) {

                    var ajax = new ej.base.Ajax('/Clientes/ValidaCNPJ?cnpj=' + cpf_cnpj, 'GET');
                    ajax.contentType = "application/json; charset=utf-8";

                    ajax.send();

                    ajax.onSuccess = function (data) {
                        console.log(data);
                        if (data == "true") {
                            alert('CPF ou CNPJ ' + cpf_cnpj + ' j?? cadastrado!');
                            $('#cnpj').val("");
                        }

                    };

                } else {

                    alert('CPF ou CNPJ inv??lido!');

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
                    alert("Aten????o: CEP n??o localizado!");
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
                    alert("Aten????o: CEP n??o localizado!");
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
                    alert("Aten????o: CEP n??o localizado!");
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

            // Garante que o valor ?? uma string
            valor = valor.toString();

            // Remove caracteres inv??lidos do valor
            valor = valor.replace(/[^0-9]/g, '');

            // Verifica CPF
            if (valor.length === 11) {
                return 'CPF';
            }

            // Verifica CNPJ
            else if (valor.length === 14) {
                return 'CNPJ';
            }

            // N??o retorna nada
            else {
                return false;
            }

        } // verifica_cpf_cnpj

        /*
         calc_digitos_posicoes

         Multiplica d??gitos vezes posi????es

        */
        function calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {

            // Garante que o valor ?? uma string
            digitos = digitos.toString();

            // Faz a soma dos d??gitos com a posi????o
            // Ex. para 10 posi????es:
            //   0    2    5    4    6    2    8    8   4
            // x10   x9   x8   x7   x6   x5   x4   x3  x2
            //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
            for (var i = 0; i < digitos.length; i++) {
                // Preenche a soma com o d??gito vezes a posi????o
                soma_digitos = soma_digitos + (digitos[i] * posicoes);

                // Subtrai 1 da posi????o
                posicoes--;

                // Parte espec??fica para CNPJ
                // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
                if (posicoes < 2) {
                    // Retorno a posi????o para 9
                    posicoes = 9;
                }
            }

            // Captura o resto da divis??o entre soma_digitos dividido por 11
            // Ex.: 196 % 11 = 9
            soma_digitos = soma_digitos % 11;

            // Verifica se soma_digitos ?? menor que 2
            if (soma_digitos < 2) {
                // soma_digitos agora ser?? zero
                soma_digitos = 0;
            } else {
                // Se for maior que 2, o resultado ?? 11 menos soma_digitos
                // Ex.: 11 - 9 = 2
                // Nosso d??gito procurado ?? 2
                soma_digitos = 11 - soma_digitos;
            }

            // Concatena mais um d??gito aos primeiro nove d??gitos
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

            // Garante que o valor ?? uma string
            valor = valor.toString();

            // Remove caracteres inv??lidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // Captura os 9 primeiros d??gitos do CPF
            // Ex.: 02546288423 = 025462884
            var digitos = valor.substr(0, 9);

            // Faz o c??lculo dos 9 primeiros d??gitos do CPF para obter o primeiro d??gito
            var novo_cpf = calc_digitos_posicoes(digitos);

            // Faz o c??lculo dos 10 d??gitos do CPF para obter o ??ltimo d??gito
            var novo_cpf = calc_digitos_posicoes(novo_cpf, 11);

            // Verifica se o novo CPF gerado ?? id??ntico ao CPF enviado
            if (novo_cpf === valor) {
                // CPF v??lido
                return true;
            } else {
                // CPF inv??lido
                return false;
            }

        } // valida_cpf

        /*
         valida_cnpj

         Valida se for um CNPJ

        */
        function valida_cnpj(valor) {

            // Garante que o valor ?? uma string
            valor = valor.toString();

            // Remove caracteres inv??lidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // O valor original
            var cnpj_original = valor;

            // Captura os primeiros 12 n??meros do CNPJ
            var primeiros_numeros_cnpj = valor.substr(0, 12);

            // Faz o primeiro c??lculo
            var primeiro_calculo = calc_digitos_posicoes(primeiros_numeros_cnpj, 5);

            // O segundo c??lculo ?? a mesma coisa do primeiro, por??m, come??a na posi????o 6
            var segundo_calculo = calc_digitos_posicoes(primeiro_calculo, 6);

            // Concatena o segundo d??gito ao CNPJ
            var cnpj = segundo_calculo;

            // Verifica se o CNPJ gerado ?? id??ntico ao enviado
            if (cnpj === cnpj_original) {
                return true;
            }

            // Retorna falso por padr??o
            return false;

        } // valida_cnpj

        /*
         valida_cpf_cnpj

         Valida o CPF ou CNPJ

        */
        function valida_cpf_cnpj(valor) {

            // Verifica se ?? CPF ou CNPJ
            var valida = verifica_cpf_cnpj(valor);

            // Garante que o valor ?? uma string
            valor = valor.toString();

            // Remove caracteres inv??lidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // Valida CPF
            if (valida === 'CPF') {
                // Retorna true para cpf v??lido
                return valida_cpf(valor);
            }

            // Valida CNPJ
            else if (valida === 'CNPJ') {
                // Retorna true para CNPJ v??lido
                return valida_cnpj(valor);
            }

            // N??o retorna nada
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

            // Verifica se ?? CPF ou CNPJ
            var valida = verifica_cpf_cnpj(valor);

            // Garante que o valor ?? uma string
            valor = valor.toString();

            // Remove caracteres inv??lidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // Valida CPF
            if (valida === 'CPF') {

                // Verifica se o CPF ?? v??lido
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

                // Verifica se o CNPJ ?? v??lido
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
