/** @format */

import { useContext, useState } from "react";
import {
	View,
	Button as Botao,
	Text,
	SafeAreaView,
	ScrollView,
	Alert,
	Keyboard
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
	Divider,
	TextInput,
	IconButton,
	Checkbox,
	Button,
} from "react-native-paper";
import moment from "moment";
import ModalVariavel from "./modalVariavel";
import ContagemAvulsa from "./modalContagemAvulsa";
import { UserContext } from "../../../contexts/userProvider";
import Axios from "axios";
import Cabecalho from "../../cabecalho";

type ISku = {
	sku: number;
	descricao: string;
	shelfLife: number | null;
	pesLiquidoCx: number | null;
	tipoPeso: number | null;
};

export default function Cadastro() {
	const { tkn, listaContagem, idDemanda } = useContext(UserContext);

	const [visible, setVisible] = useState(false);
	const [verConfirmacao, setVerConfirmacao] = useState(false);

	const [arrayPeso, setArrayPeso] = useState<number[]>([]);
	const [pesoMedio, setPesoMedio] = useState<string>("");
	const [peso, setPeso] = useState<string>();

	const [date, setDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1)),
	);
	const [showPicker, setShowPicker] = useState(false);

	//VAR DO FORMULARIO
	const [checked, setChecked] = useState<"checked" | "unchecked">("unchecked");
	const [endereco, setEndereco] = useState("");
	const [sku, setSku] = useState("");
	const [sif, setSif] = useState("");
	const [qtdCX, setQtdCx] = useState("");
	const [qtdUN, setQtdUn] = useState("");

	//VALIDACOES
	const [validarEndereco, setValidarEndereco] = useState<boolean>(false);
	const [validarSku, setValidarSku] = useState<boolean>(false);
	const [validarPesoVariavel, setValidarPesoVariavel] = useState<number>(1);
	const [descricaoSku, setDescricaoSku] = useState<ISku | undefined>();

	function verificarSeContemEndereco() {
		const filtrar = listaContagem.filter(
			(filtrar) => filtrar.enderecoId === endereco,
		);
		if (filtrar.length > 0) {
			setValidarEndereco(true);
		} else {
			setValidarEndereco(false);
			Alert.alert("Endereço não consta na sua lista de demanda");
		}
	}

	function verificarSeSkuEValido() {
		Axios.get(`https://wmsapi.vercel.app/material/sku/${sku}`).then((response) => {
			if (response.data) {
				setDescricaoSku(response.data);
				setValidarPesoVariavel(response.data?.tipoPeso);
				setValidarSku(true);
			} else {
				setDescricaoSku(undefined);
				setValidarSku(false);
				Alert.alert("SKU NÃO LOCALIZADO, VERIFICAR CADASTRO JUNTO COM O ADM");
			}
		}).catch(erro => console.log(erro))
	}

	function validarCadastro() {
		if (checked === "checked" && validarEndereco) {
			return false;
		} else if (
			validarEndereco &&
			validarSku &&
			qtdCX.length > 0 &&
			qtdUN.length > 0 &&
			sif.length > 0 &&
			new Date(date) <= new Date()
		) {
			if (validarPesoVariavel) {
				if (validarPesoVariavel === 2 && !isNaN(parseFloat(pesoMedio))) {
					return false;
				} else if (validarPesoVariavel === 1) {
					return false;
				} else {
					return true;
				}
			}
		} else {
			return true;
		}
	}

	const infoCadastro = () => {
		if (checked === "checked") {
			return {
				produtoId: 1,
				quantidadecx: 0,
				endereco: endereco,
				demandaId: parseInt(idDemanda),
				quantideUn: 0,
			};
		} else {
			if(descricaoSku){
				return {
					produtoId: descricaoSku?.sku,
					quantidadecx: parseInt(qtdCX),
					endereco: endereco,
					demandaId: parseInt(idDemanda),
					sif: parseInt(sif),
					quantideUn: parseInt(qtdUN),
					fabricacao: new Date(
						date.getFullYear(),
						date.getMonth(),
						date.getDate(),
					),
					pesoMedio: isNaN(parseFloat(pesoMedio)) ? null : parseFloat(pesoMedio),
				};
			}
		}
	};	

	async function cadastrarContagem() {
		return await Axios.post(
			`https://wmsapi.vercel.app/estoque/contagem`,
			infoCadastro(),
			{ headers: { "Content-Type": "application/json" } },
		)
			.then((response) => {
				if (response.status === 201) {
					Alert.alert(response.data);
				} else {
					setChecked("unchecked");
					setSku("");
					setQtdCx("");
					setQtdUn("");
					setEndereco("");
					setPeso("");
					setPesoMedio("");
					setSif("");
					setArrayPeso([]);
					setPesoMedio("");
					setVerConfirmacao(false);
					setDate(new Date(new Date().setDate(new Date().getDate() + 1)));
					Alert.alert("registro cadastrado!");
				}
			})
			.catch((erro) => {
        console.log(erro)
				Alert.alert("erro, ação nao executada");
			});
	}

	async function cadastrarContagemManterEndereco() {
		return await Axios.post(
			`https://wmsapi.vercel.app/estoque/contagem`,
			infoCadastro(),
			{ headers: { "Content-Type": "application/json" } },
		)
			.then((response) => {
				if (response.status === 201) {
					Alert.alert(response.data);
				} else {
					setChecked("unchecked");
					setSku("");
					setQtdCx("");
					setQtdUn("");
					setPeso("");
					setPesoMedio("");
					setSif("");
					setArrayPeso([]);
					setPesoMedio("");
					setVerConfirmacao(false);
					setDate(new Date(new Date().setDate(new Date().getDate() + 1)));
					Alert.alert("registro cadastrado!");
				}
			})
			.catch((erro) => Alert.alert("erro, açao não executada"));
	}

	const showDateTimePicker = () => {
		setShowPicker(true);
	};

	const hideDateTimePicker = () => {
		setShowPicker(false);
	};

	const handleDatePicked = (event: Event, selectedDate?: Date) => {
		if (selectedDate) {
			if (selectedDate > new Date()) {
				Alert.alert("data fabricacao, nao pode ser maior que data atual");
			} else {
				setDate(selectedDate);
			}
		}
		hideDateTimePicker();
	};

	const [text, setText] = useState("");
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Cabecalho titulo='CADASTRO' />
			<ScrollView style={{ marginHorizontal: 8, flex: 2, gap: 16 }}>
				{visible && (
					<ModalVariavel
						setPesoMedio={setPesoMedio}
						peso={peso}
						setPeso={setPeso}
						setArrayPeso={setArrayPeso}
						arrayPeso={arrayPeso}
						setVisible={setVisible}
					/>
				)}
				<ContagemAvulsa
					descricaoSku={descricaoSku}
					cadastrarComEndereco={cadastrarContagemManterEndereco}
					cadastrar={cadastrarContagem}
					verConfirmacao={verConfirmacao}
					setVerConfirmacao={setVerConfirmacao}
				/>
				<TextInput
					mode='outlined'
					label='Endereço'
					placeholder='Scaneie o QR Code ou digite o endereço'
					value={endereco}
					onChangeText={setEndereco}
					onBlur={verificarSeContemEndereco}
				/>
				<TextInput
					mode='outlined'
					label='Sku'
					placeholder='Scaneie o Cod. Barras ou digita o codigo do produto'
					value={sku}
					onChangeText={setSku}
					onBlur={verificarSeSkuEValido}
					inputMode='numeric'
				/>
				{descricaoSku?.descricao && (
					<Text style={{ margin: 4, fontSize: 15 }}>
						{descricaoSku.descricao}
					</Text>
				)}

				<TextInput
					mode='outlined'
					label='SIF'
					placeholder='Informe o sif'
					value={sif}
					onChangeText={setSif}
					inputMode='numeric'
				/>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginHorizontal: 16,
					}}>
					<Text>Fabricação</Text>
					<Text>{moment(date).format("DD/MM/YYYY")}</Text>
					<IconButton
						mode='contained-tonal'
						icon='calendar'
						size={20}
						onPress={showDateTimePicker}
					/>

					{showPicker && (
						<DateTimePicker
							value={date}
							mode='date' // Modo de seleção (date, time, datetime)
							display='default' // Exibir o picker padrão do sistema ou modal
							onChange={handleDatePicked as any}
						/>
					)}
				</View>
				<TextInput
					mode='outlined'
					label='Quantidade CX'
					placeholder='Informe a quantidade de Caixa'
					value={qtdCX}
					onChangeText={setQtdCx}
					inputMode='numeric'
				/>
				<TextInput
					mode='outlined'
					label='Quantidade Un'
					placeholder='Informe a quantidade de unidades'
					value={qtdUN}
					onChangeText={setQtdUn}
					inputMode='numeric'
				/>
				<Divider style={{ marginVertical: 16 }} />
				<Checkbox.Item
					onPress={() => {
						if (checked === "unchecked") {
							setChecked("checked");
						} else {
							setChecked("unchecked");
						}
					}}
					label='Posiçao vazia?'
					status={checked}
				/>
				<Divider style={{ marginVertical: 16 }} />
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginHorizontal: 16,
					}}>
					<TextInput
						disabled={true}
						style={{ width: "80%" }}
						mode='outlined'
						label='Peso Caixa'
						placeholder='Informe o peso da Caixa'
						value={pesoMedio}
					/>
					<IconButton
						mode='contained'
						icon='weight'
						size={20}
						onPress={() => setVisible(true)}
					/>
				</View>

				<Button
					disabled={validarCadastro()}
					style={{ marginTop: 16 }}
					icon='send'
					mode='contained'
					onPress={() => setVerConfirmacao(true)}>
					Cadastrar Contagem
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
}
