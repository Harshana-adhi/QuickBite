import { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import CategoryFilter from '../components/CategoryFilter';
import MenuItemCard from '../components/MenuItemCard';
import { categories, menuItems } from '../data/menu';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { width } = useWindowDimensions();

  let numColumns = 2;
  if (width >= 900) numColumns = 4;
  else if (width >= 600) numColumns = 3;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <Pressable onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.headerText}>Cart</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.headerText}>Profile</Text>
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search food or drinks..."
        placeholderTextColor={colors.textLight}
        value={search}
        onChangeText={setSearch}
      />
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <FlatList
        key={numColumns}
        data={filteredItems}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={{ width: `${100 / numColumns}%` }}>
            <MenuItemCard
              item={item}
              onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  headerText: {
    color: '#fff',
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  search: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: fontSizes.body,
    color: colors.text,
    margin: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.sm + 2,
    paddingBottom: spacing.lg,
  },
  empty: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSizes.body,
    marginTop: spacing.xl,
  },
});
