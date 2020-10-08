export const numerateData = (groups) =>
  groups.map((group, i) => ({
    ...group,
    number: `${i + 1}`,
    children: group.children.map((kind, j) => ({
      ...kind,
      number: `${i + 1}.${j + 1}`,
      children: kind.children.map((material, k) => ({
        ...material,
        number: `${i + 1}.${j + 1}.${k + 1}`
      }))
    }))
  }));
