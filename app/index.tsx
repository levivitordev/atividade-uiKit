import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
    Button,
    Card,
    Chip,
    FAB,
    Text,
    TextInput,
} from 'react-native-paper';
import { useFinanceStore } from '../store/useFinanceStore';

export default function Index() {
  const router = useRouter();
  const { renda, gastos, setRenda } = useFinanceStore();
  const [rendaDigitada, setRendaDigitada] = useState('');

  let gastosVista = 0;
  let parcelasMes = 0;
  let dividaTotalParcelada = 0;

  gastos.forEach((gasto) => {
    if (gasto.tipo === 'avista') {
      gastosVista += gasto.valor;
    } else {
      const qtdParcelas = gasto.parcelas || 1;
      parcelasMes += gasto.valor / qtdParcelas;
      dividaTotalParcelada += gasto.valor;
    }
  });

  const totalComprometido = gastosVista + parcelasMes;
  const saldo = renda - totalComprometido;

  function salvarRenda() {
    if (!rendaDigitada) return;
    setRenda(Number(rendaDigitada));
    setRendaDigitada('');
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.appName}>Controle Mensal</Text>
        <Text style={styles.subtitle}>
          Organize sua renda e seus gastos do mês
        </Text>

        <Card style={styles.balanceCard}>
          <Card.Content>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Text style={styles.balanceValue}>R$ {saldo.toFixed(2)}</Text>

            <View style={styles.line} />

            <Text style={styles.balanceInfo}>
              Renda mensal: R$ {renda.toFixed(2)}
            </Text>
            <Text style={styles.balanceInfo}>
              Total comprometido: R$ {totalComprometido.toFixed(2)}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Informar renda do mês</Text>

            <TextInput
              label="Digite sua renda mensal"
              value={rendaDigitada}
              onChangeText={setRendaDigitada}
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

            <Button
              mode="contained"
              onPress={salvarRenda}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Salvar renda
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.grid}>
          <Card style={styles.smallCard}>
            <Card.Content>
              <Text style={styles.smallLabel}>À vista</Text>
              <Text style={styles.smallValue}>R$ {gastosVista.toFixed(2)}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.smallCard}>
            <Card.Content>
              <Text style={styles.smallLabel}>Parcelas/mês</Text>
              <Text style={styles.smallValue}>R$ {parcelasMes.toFixed(2)}</Text>
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Dívidas parceladas</Text>
            <Text style={styles.debtValue}>
              R$ {dividaTotalParcelada.toFixed(2)}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Gastos cadastrados</Text>

            {gastos.length === 0 ? (
              <Text style={styles.emptyText}>Nenhum gasto cadastrado ainda.</Text>
            ) : (
              gastos.map((gasto, index) => (
                <View key={index} style={styles.expenseItem}>
                  <View>
                    <Text style={styles.expenseTitle}>{gasto.descricao}</Text>
                    <Text style={styles.expenseSubtitle}>
                      R$ {gasto.valor.toFixed(2)}
                    </Text>
                  </View>

                  <Chip
                    textStyle={styles.chipText}
                    style={styles.chip}
                  >
                    {gasto.tipo === 'avista'
                      ? 'À vista'
                      : `${gasto.parcelas}x`}
                  </Chip>
                </View>
              ))
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        label="Gasto"
        style={styles.fab}
        color="#FFFFFF"
        onPress={() => router.push('/add' as any)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  container: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 120,
  },
  appName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: '#4C1D95',
    borderRadius: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  balanceLabel: {
    fontFamily: 'Poppins_500Medium',
    color: '#DDD6FE',
    fontSize: 15,
  },
  balanceValue: {
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    fontSize: 38,
    marginTop: 6,
  },
  line: {
    height: 1,
    backgroundColor: '#A78BFA',
    opacity: 0.5,
    marginVertical: 16,
  },
  balanceInfo: {
    fontFamily: 'Poppins_500Medium',
    color: '#F5F3FF',
    fontSize: 13,
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#111827',
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 4,
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  smallCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  smallLabel: {
    fontFamily: 'Poppins_500Medium',
    color: '#94A3B8',
    fontSize: 13,
  },
  smallValue: {
    fontFamily: 'Poppins_700Bold',
    color: '#22C55E',
    fontSize: 19,
    marginTop: 4,
  },
  debtValue: {
    fontFamily: 'Poppins_700Bold',
    color: '#F87171',
    fontSize: 28,
  },
  emptyText: {
    fontFamily: 'Poppins_400Regular',
    color: '#94A3B8',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    paddingVertical: 14,
  },
  expenseTitle: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    fontSize: 15,
  },
  expenseSubtitle: {
    fontFamily: 'Poppins_400Regular',
    color: '#94A3B8',
    marginTop: 2,
  },
  chip: {
    backgroundColor: '#312E81',
  },
  chipText: {
    fontFamily: 'Poppins_500Medium',
    color: '#DDD6FE',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    backgroundColor: '#8B5CF6',
    borderRadius: 18,
  },
});