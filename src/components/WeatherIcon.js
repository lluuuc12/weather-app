export function WeatherIcon({
  title,
  icon,
  mini = false,
  temps,
  unit = 'ºC',
  ...props
}) {
  return (
    <>
      <p>{title}</p>
      <div className="flex justify-center">
        {mini ? (
          <img src={icon} alt={title} title="title" />
        ) : (
          <img src={icon} alt={title} title="title" />
        )}
      </div>
      <div className="gap-1 flex justify-center">
        {temps.map((e) => (
          <span>{Math.round(e) + '' + unit}</span>
        ))}
      </div>
    </>
  );
}
