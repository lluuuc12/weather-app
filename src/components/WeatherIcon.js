export function WeatherIcon({
  title,
  icon,
  description,
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
          <img src={icon} alt={title} title={description} />
        ) : (
          <img src={icon} alt={title} title={description} />
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
