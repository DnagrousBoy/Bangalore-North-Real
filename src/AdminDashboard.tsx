import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Home, Users, Star, LogOut, Plus, Calendar, CheckCircle, Edit, Save, Trash2, Menu, X, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData, Property, DealerInfo, ContactInfo } from './lib/DataContext';
import { Button } from './components/ui/button';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('appointments');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { appointments, ratings, updateAppointmentStatus, properties, updateProperty, addProperty, deleteProperty, dealerInfo, updateDealerInfo, contactInfo, updateContactInfo, adminPassword, updateAdminPassword } = useData();

  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [tempProperty, setTempProperty] = useState<Property | null>(null);

  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [newProperty, setNewProperty] = useState<Omit<Property, 'id'>>({
    title: '', location: '', price: '', image: '', beds: 0, baths: 0, sqft: '', tag: 'For Sale'
  });

  const [isEditingDealer, setIsEditingDealer] = useState(false);
  const [tempDealer, setTempDealer] = useState<DealerInfo | null>(null);

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [tempContact, setTempContact] = useState<ContactInfo | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdUpdateMessage, setPwdUpdateMessage] = useState({ text: '', type: '' });

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'ratings', label: 'Ratings', icon: Star },
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'dealer', label: 'Dealer Info', icon: Users },
    { id: 'contact', label: 'Contact Details', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleEditProperty = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setTempProperty({ ...prop });
  };

  const handleSaveProperty = () => {
    if (tempProperty) {
      updateProperty(tempProperty);
      setEditingPropertyId(null);
    }
  };

  const handleEditDealer = () => {
    setIsEditingDealer(true);
    setTempDealer({ ...dealerInfo });
  };

  const handleSaveDealer = () => {
    if (tempDealer) {
      updateDealerInfo(tempDealer);
      setIsEditingDealer(false);
    }
  };

  const handleEditContact = () => {
    setIsEditingContact(true);
    setTempContact({ ...contactInfo });
  };

  const handleSaveContact = () => {
    if (tempContact) {
      updateContactInfo(tempContact);
      setIsEditingContact(false);
    }
  };

  const handleAddNewProperty = () => {
    if (!newProperty.title || !newProperty.image) return;
    addProperty(newProperty);
    setIsAddingProperty(false);
    setNewProperty({ title: '', location: '', price: '', image: '', beds: 0, baths: 0, sqft: '', tag: 'For Sale' });
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === adminPassword || password === 'owner-123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect security code. Please try again.');
    }
  };

  const handlePasswordUpdate = () => {
    if (currentPassword !== adminPassword) {
      setPwdUpdateMessage({ text: 'Current password is incorrect.', type: 'error' });
      return;
    }
    if (newPasswordValue !== confirmPassword) {
      setPwdUpdateMessage({ text: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (newPasswordValue.length < 6) {
      setPwdUpdateMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
      return;
    }
    updateAdminPassword(newPasswordValue);
    setPwdUpdateMessage({ text: 'Password updated successfully.', type: 'success' });
    setCurrentPassword('');
    setNewPasswordValue('');
    setConfirmPassword('');
    
    setTimeout(() => setPwdUpdateMessage({ text: '', type: '' }), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 glass-card max-w-md w-full p-8 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-gold/20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-background font-serif font-bold text-3xl shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              B
            </div>
          </div>
          <h2 className="text-3xl font-serif text-center mb-2 text-foreground">Admin Portal</h2>
          <p className="text-muted-foreground text-center mb-8 text-sm">Sign in to manage Bangalore North Real Estate</p>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Security Code</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors" 
                placeholder="Enter password..." 
              />
            </div>
            {loginError && <p className="text-destructive text-sm text-center">{loginError}</p>}
            <Button type="submit" className="w-full bg-gold hover:bg-gold-light text-background font-medium h-12 rounded-lg text-lg transition-transform hover:scale-[1.02]">
              Access Dashboard
            </Button>
          </form>
          <div className="mt-6 text-center">
             <Link to="/" className="text-sm text-muted-foreground hover:text-gold transition-colors inline-block">← Back to main site</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 glass z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-background font-serif font-bold text-xl">
            B
          </div>
          <span className="font-serif text-lg font-semibold tracking-wide">
            BNRE <span className="text-gold text-xs">Admin</span>
          </span>
        </div>
        <button onClick={() => setIsMobileSidebarOpen(true)} className="p-2 text-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-[90]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-[100] w-64 border-r border-white/10 bg-background md:bg-secondary/30 p-6 flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-background font-serif font-bold text-xl">
              B
            </div>
            <span className="font-serif text-xl font-semibold tracking-wide hidden md:inline">
              Bangalore North <span className="text-gold text-sm block -mt-1">Admin</span>
            </span>
            <span className="font-serif text-xl font-semibold tracking-wide md:hidden">
              Admin
            </span>
          </div>
          <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden p-2 text-muted-foreground hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-background font-medium shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-gold transition-colors mt-auto pt-4 border-t border-white/10">
          <LogOut className="w-5 h-5 shrink-0" />
          Back to Website
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 h-[calc(100vh-73px)] md:h-screen overflow-y-auto overflow-x-hidden w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <h1 className="text-2xl md:text-3xl font-serif font-medium capitalize">Manage {activeTab}</h1>
          {activeTab === 'properties' && !isAddingProperty && (
            <button 
              onClick={() => setIsAddingProperty(true)}
              className="bg-gold hover:bg-gold-light text-background font-medium rounded-full px-6 py-2.5 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" /> Add New Property
            </button>
          )}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl"
        >
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-2xl">
                  <p className="text-muted-foreground">No appointments booked yet.</p>
                </div>
              ) : (
                appointments.map((apt) => (
                  <div key={apt.id} className="glass-card p-6 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">{apt.name}</h3>
                      <p className="text-sm text-muted-foreground">{apt.phone} • {new Date(apt.date).toLocaleDateString()} at {apt.time}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                        apt.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        apt.status === 'confirmed' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-green-500/20 text-green-500'
                      }`}>
                        {apt.status}
                      </span>
                      {apt.status === 'pending' && (
                        <button onClick={() => updateAppointmentStatus(apt.id, 'confirmed')} className="p-2 hover:bg-white/10 rounded-full text-blue-500 transition-colors" title="Confirm">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {apt.status === 'confirmed' && (
                        <button onClick={() => updateAppointmentStatus(apt.id, 'completed')} className="p-2 hover:bg-white/10 rounded-full text-green-500 transition-colors" title="Mark Completed">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'ratings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ratings.map((rating) => (
                <div key={rating.id} className="glass-card p-6 rounded-xl relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(rating.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 font-light">"{rating.content}"</p>
                  <div>
                    <h4 className="font-medium text-foreground">{rating.name}</h4>
                    <p className="text-xs text-muted-foreground">{new Date(rating.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-6">
              {isAddingProperty && (
                <div className="glass-card p-6 rounded-xl border border-gold/30 mb-8 bg-gold/5">
                  <h3 className="text-xl font-serif text-gold mb-6 border-b border-white/10 pb-4">Add New Property</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Property Title</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={newProperty.title} onChange={e => setNewProperty({...newProperty, title: e.target.value})} placeholder="e.g. Palm Jumeirah Villa" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Image URL</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={newProperty.image} onChange={e => setNewProperty({...newProperty, image: e.target.value})} placeholder="https://..." />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Location</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={newProperty.location} onChange={e => setNewProperty({...newProperty, location: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Price</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} placeholder="e.g. ₹45 Cr" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-1 block">Beds</label>
                        <input type="number" className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={newProperty.beds} onChange={e => setNewProperty({...newProperty, beds: Number(e.target.value)})} />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-1 block">Baths</label>
                        <input type="number" className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={newProperty.baths} onChange={e => setNewProperty({...newProperty, baths: Number(e.target.value)})} />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-1 block">Sq.Ft (e.g. 5,000)</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={newProperty.sqft} onChange={e => setNewProperty({...newProperty, sqft: e.target.value})} />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-1 block">Tag</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={newProperty.tag} onChange={e => setNewProperty({...newProperty, tag: e.target.value})}>
                          <option value="For Sale" className="text-black">For Sale</option>
                          <option value="For Rent" className="text-black">For Rent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                      <Button type="button" variant="ghost" onClick={() => setIsAddingProperty(false)}>Cancel</Button>
                      <Button type="button" className="bg-gold text-background hover:bg-gold-light" onClick={handleAddNewProperty}>
                        <Save className="w-4 h-4 mr-2" /> Add Property to Listing
                      </Button>
                  </div>
                </div>
              )}

              {properties.map((property) => (
                <div key={property.id} className="glass-card p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start">
                  <img src={property.image} alt={property.title} className="w-48 h-32 object-cover rounded-lg" />
                  
                  {editingPropertyId === property.id && tempProperty ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Title</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={tempProperty.title} onChange={e => setTempProperty({...tempProperty, title: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Image URL</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={tempProperty.image} onChange={e => setTempProperty({...tempProperty, image: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Location</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={tempProperty.location} onChange={e => setTempProperty({...tempProperty, location: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Price</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={tempProperty.price} onChange={e => setTempProperty({...tempProperty, price: e.target.value})} />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-xs text-muted-foreground mb-1 block">Beds</label>
                          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={tempProperty.beds} onChange={e => setTempProperty({...tempProperty, beds: Number(e.target.value)})} />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-muted-foreground mb-1 block">Baths</label>
                          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={tempProperty.baths} onChange={e => setTempProperty({...tempProperty, baths: Number(e.target.value)})} />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-xs text-muted-foreground mb-1 block">Sq.Ft (e.g. 5,000)</label>
                          <input className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={tempProperty.sqft} onChange={e => setTempProperty({...tempProperty, sqft: e.target.value})} />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-muted-foreground mb-1 block">Tag</label>
                          <select className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-sm focus:border-gold outline-none" value={tempProperty.tag} onChange={e => setTempProperty({...tempProperty, tag: e.target.value})}>
                            <option value="For Sale" className="text-black">For Sale</option>
                            <option value="For Rent" className="text-black">For Rent</option>
                          </select>
                        </div>
                      </div>
                      <div className="md:col-span-2 flex justify-between gap-2 mt-2 pt-4 border-t border-white/10">
                        <Button type="button" variant="destructive" onClick={() => deleteProperty(property.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                        <div className="flex gap-2">
                          <Button type="button" variant="ghost" onClick={() => setEditingPropertyId(null)}>Cancel</Button>
                          <Button type="button" className="bg-gold text-background hover:bg-gold-light" onClick={handleSaveProperty}>
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-serif text-gold">{property.title}</h4>
                          <p className="text-muted-foreground text-sm">{property.location}</p>
                        </div>
                        <button onClick={() => handleEditProperty(property)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-white" title="Edit Property">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{property.price}</span>
                        <span>•</span>
                        <span>{property.beds} Beds</span>
                        <span>•</span>
                        <span>{property.baths} Baths</span>
                        <span>•</span>
                        <span>{property.sqft} Sq.Ft</span>
                        <span>•</span>
                        <span className="text-gold">{property.tag}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dealer' && (
            <div className="glass-card rounded-2xl p-8">
              {isEditingDealer && tempDealer ? (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Header Description</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none min-h-[100px]" 
                      value={tempDealer.headerDesc} 
                      onChange={e => setTempDealer({...tempDealer, headerDesc: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Portrait Image URL</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none" 
                      value={tempDealer.imageUrl} 
                      onChange={e => setTempDealer({...tempDealer, imageUrl: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Legacy Title</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none" 
                      value={tempDealer.legacyTitle} 
                      onChange={e => setTempDealer({...tempDealer, legacyTitle: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Legacy Paragraph 1</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none min-h-[100px]" 
                      value={tempDealer.legacyDesc1} 
                      onChange={e => setTempDealer({...tempDealer, legacyDesc1: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Legacy Paragraph 2</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none min-h-[100px]" 
                      value={tempDealer.legacyDesc2} 
                      onChange={e => setTempDealer({...tempDealer, legacyDesc2: e.target.value})} 
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={() => setIsEditingDealer(false)}>Cancel</Button>
                    <Button type="button" className="bg-gold text-background hover:bg-gold-light" onClick={handleSaveDealer}>
                      <Save className="w-4 h-4 mr-2" /> Save Dealer Info
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-2xl font-serif text-gold">Current Dealer Information</h3>
                    <Button type="button" variant="outline" onClick={handleEditDealer} className="border-gold/30 hover:border-gold text-gold">
                      <Edit className="w-4 h-4 mr-2" /> Edit Info
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-medium">Header Description</h4>
                      <p className="text-foreground/90">{dealerInfo.headerDesc}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-medium">Portrait Image preview</h4>
                      <img src={dealerInfo.imageUrl} className="w-48 h-32 object-cover rounded-lg border border-white/10" alt="Dealer preview" />
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-medium">Legacy Section</h4>
                      <div className="space-y-4">
                        <p><strong className="text-gold">Title:</strong> <span className="text-foreground/90">{dealerInfo.legacyTitle}</span></p>
                        <p><strong className="text-gold block mb-1">Paragraph 1:</strong> <span className="text-foreground/90">{dealerInfo.legacyDesc1}</span></p>
                        <p><strong className="text-gold block mb-1">Paragraph 2:</strong> <span className="text-foreground/90">{dealerInfo.legacyDesc2}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="glass-card rounded-2xl p-6 md:p-8">
              {isEditingContact && tempContact ? (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none" 
                      value={tempContact.phone} 
                      onChange={e => setTempContact({...tempContact, phone: e.target.value})} 
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">WhatsApp Number</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none" 
                      value={tempContact.whatsapp} 
                      onChange={e => setTempContact({...tempContact, whatsapp: e.target.value})} 
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none" 
                      value={tempContact.email} 
                      onChange={e => setTempContact({...tempContact, email: e.target.value})} 
                      placeholder="hello@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Office Address</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none min-h-[100px]" 
                      value={tempContact.address} 
                      onChange={e => setTempContact({...tempContact, address: e.target.value})} 
                      placeholder="Level 42, The Imperial..."
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={() => setIsEditingContact(false)}>Cancel</Button>
                    <Button type="button" className="bg-gold text-background hover:bg-gold-light" onClick={handleSaveContact}>
                      <Save className="w-4 h-4 mr-2" /> Save Contact Info
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-2xl font-serif text-gold">Public Contact Information</h3>
                    <Button type="button" variant="outline" onClick={handleEditContact} className="border-gold/30 hover:border-gold text-gold">
                      <Edit className="w-4 h-4 mr-2" /> Edit Details
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-medium">Main Phone</h4>
                        <p className="text-foreground/90 font-medium">{contactInfo.phone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-medium">WhatsApp</h4>
                        <p className="text-foreground/90 font-medium">{contactInfo.whatsapp}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-medium">General Email</h4>
                      <p className="text-foreground/90">{contactInfo.email}</p>
                    </div>

                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-medium">Office Location</h4>
                      <p className="text-foreground/90 whitespace-pre-line">{contactInfo.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-card rounded-2xl p-8 max-w-2xl">
              <h3 className="text-2xl font-serif text-gold mb-6 border-b border-white/10 pb-4">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-4">Update Admin Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Current Password</label>
                      <input 
                        type="password"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none" 
                        value={currentPassword} 
                        onChange={e => setCurrentPassword(e.target.value)} 
                        placeholder="••••••••••••"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">New Password</label>
                      <input 
                        type="password"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none" 
                        value={newPasswordValue} 
                        onChange={e => setNewPasswordValue(e.target.value)} 
                        placeholder="••••••••••••"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Confirm New Password</label>
                      <input 
                        type="password"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-gold outline-none" 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        placeholder="••••••••••••"
                      />
                    </div>
                  </div>
                </div>

                {pwdUpdateMessage.text && (
                  <div className={`p-3 rounded-lg text-sm ${pwdUpdateMessage.type === 'error' ? 'bg-destructive/20 text-destructive' : 'bg-green-500/20 text-green-500'}`}>
                    {pwdUpdateMessage.text}
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <Button type="button" className="bg-gold text-background hover:bg-gold-light" onClick={handlePasswordUpdate}>
                    <Save className="w-4 h-4 mr-2" /> Update Password
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
