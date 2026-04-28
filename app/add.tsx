import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, RadioButton, Text, TextInput } from 'react-native-paper';
import { useFinanceStore } from '../store/useFinanceStore';

export default function Add() {
  const router = useRouter();
  const adicionarGasto = useFinanceStore((state) => state.adicionarGasto);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'avista' | 'parcelado'>('avista');
  const [parcelas, setParcelas] = useState('');

  function salvarGasto() {
    if (!descricao || !valor) return;

    adicionarGasto({
      descricao,
      valor: Number(valor),
      tipo,
      parcelas: tipo === 'parcelado' ? Number(parcelas) : undefined,
    });

    router.back();
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Adicionar Gasto</Text>
      <Text style={styles.subtitle}>Cadastre seus gastos do mês</Text>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Descrição do gasto"
            value={descricao}
            onChangeText={setDescricao}
            mode="outlined"
            textColor="#FFFFFF"
            outlineColor="#475569"
            activeOutlineColor="#8B5CF6"
            style={styles.input}
            theme={{
              colors: {
                onSurfaceVariant: '#94A3B8',
                background: '#111827',
              },
            }}
          />

          <TextInput
            label="Valor total"
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            mode="outlined"
            textColor="#FFFFFF"
            outlineColor="#475569"
            activeOutlineColor="#8B5CF6"
            style={styles.input}
            theme={{
              colors: {
                onSurfaceVariant: '#94A3B8',
                background: '#111827',
              },
            }}
          />

          <Text style={styles.label}>Tipo de gasto</Text>

          <RadioButton.Group
            onValueChange={(value) => setTipo(value as 'avista' | 'parcelado')}
            value={tipo}
          >
            <View style={styles.radio}>
              <RadioButton value="avista" color="#8B5CF6" />
              <Text style={styles.radioText}>À vista</Text>
            </View>

            <View style={styles.radio}>
              <RadioButton value="parcelado" color="#8B5CF6" />
              <Text style={styles.radioText}>Parcelado</Text>
            </View>
          </RadioButton.Group>

          {tipo === 'parcelado' && (
            <TextInput
              label="Quantidade de parcelas"
              value={parcelas}
              onChangeText={setParcelas}
              keyboardType="numeric"
              mode="outlined"
              textColor="#FFFFFF"
              outlineColor="#475569"
              activeOutlineColor="#8B5CF6"
              style={styles.input}
              theme={{
                colors: {
                  onSurfaceVariant: '#94A3B8',
                  background: '#111827',
                },
              }}
            />
          )}

          <Button
            mode="contained"
            onPress={salvarGasto}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Salvar gasto
          </Button>

          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.backButton}
            labelStyle={styles.backButtonText}
          >
            Voltar
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1120',
    padding: 20,
    paddingTop: 55,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  input: {
    backgroundColor: '#111827',
    marginBottom: 14,
  },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 6,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  radioText: {
    fontFamily: 'Poppins_500Medium',
    color: '#E2E8F0',
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 5,
    marginTop: 14,
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  backButton: {
    borderColor: '#8B5CF6',
    borderRadius: 16,
    marginTop: 12,
  },
  backButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#C4B5FD',
  },
});